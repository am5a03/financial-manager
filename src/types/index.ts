export enum TransactionType {
  Spending = "spending",
  Income = "income",
}

export type ApiBankOfCanadaResponse = {
  terms: {
    url: string;
  };
  groupDetail: {
    label: string;
    description: string;
    link: string;
  };
  seriesDetail: Record<
    string,
    {
      label: string;
      description: string;
      dimension: {
        key: string;
        name: string;
      };
    }
  >;
  observations: Array<{
    d: string;
    [currencyPair: string]: {
      v: string;
    };
  }>;
};
