import type { Action } from "@/server/types";
import { z } from "zod";
import ky from "ky";
import { formatInTimeZone } from "date-fns-tz";
import { fxRates } from "@/db/schema";
import type { ApiBankOfCanadaResponse } from "@/types";
import { UTCDate } from "@date-fns/utc";

export type FetchFxRates = typeof FetchFxRates;
export const FetchFxRates = z.object({
  start: z.date(),
  end: z.date(),
});

const ENDPOINT_BOC = "https://www.bankofcanada.ca/valet/";

export const fetchFxRates = async ({
  ctx: { db },
  input: { start, end },
}: Action<FetchFxRates>) => {
  const startDateStr = formatInTimeZone(start, "Etc/UTC", "yyyy-MM-dd");
  const endDateStr = formatInTimeZone(end, "Etc/UTC", "yyyy-MM-dd");

  const searchParams = new URLSearchParams();
  searchParams.set("start_date", startDateStr);
  searchParams.set("end_date", endDateStr);

  console.log(searchParams);

  const api = ky.extend({ prefixUrl: ENDPOINT_BOC });
  const result = await api
    .get("observations/group/FX_RATES_MONTHLY/json", {
      searchParams,
    })
    .json<ApiBankOfCanadaResponse>();

  const parsedResult = parseApiResponse(result);
  await Promise.all(
    parsedResult
      .filter((item) => !Number.isNaN(item.exchangeRate))
      .map((item) => {
        return db
          .insert(fxRates)
          .values({
            baseCurrency: item.baseCurrency,
            quoteCurrency: item.quoteCurrency,
            rate: item.exchangeRate,
            timestamp: new UTCDate(item.date),
          })
          .onConflictDoUpdate({
            target: [
              fxRates.baseCurrency,
              fxRates.quoteCurrency,
              fxRates.timestamp,
            ],
            set: { rate: fxRates.rate },
          });
      }),
  );
};

const parseApiResponse = (apiResponse: ApiBankOfCanadaResponse) => {
  const { seriesDetail, observations } = apiResponse;

  // Extract all results by looping through observations
  const results = observations.flatMap((observation) => {
    // For each observation, map through all currency pairs
    return Object.keys(seriesDetail).map((currencyPair) => {
      const [fxm, baseCurrency, quoteCurrency] =
        currencyPair.match(/.{3}/g) || []; // Split pair (e.g., "FXUSDCAD" -> ["USD", "CAD"])
      const exchangeRate = observation[currencyPair]?.v; // Get the exchange rate
      const date = observation.d; // Get the date

      return {
        baseCurrency,
        quoteCurrency,
        exchangeRate: Number.parseFloat(exchangeRate), // Convert to a number for precision
        date,
      };
    });
  });

  return results;
};
