"use client";

import { DatePicker } from "@/components/ui/datepicker";
import FormFeild from "@/components/ui/form/form-field";
import { trpc } from "@/utils/trpc";
import { UTCDate } from "@date-fns/utc";

export default function Page() {
  const { mutateAsync: fetchFxRates, isPending } =
    trpc.fetchFxRates.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchFxRates({
      start: new UTCDate("2024-01-01"),
      end: new UTCDate("2024-12-31"),
    });
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch FX Rates</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <FormFeild label="Start Date">
            <DatePicker onDateChanged={(d) => {}} />
          </FormFeild>
          <FormFeild label="End Date">
            <DatePicker onDateChanged={(d) => {}} />
          </FormFeild>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
