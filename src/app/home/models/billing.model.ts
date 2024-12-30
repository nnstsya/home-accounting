export interface BillingModel {
  id: string;
  value: number;
  currency: string;
  userId: number;
}

export interface ExchangeRateModel {
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  };
}
