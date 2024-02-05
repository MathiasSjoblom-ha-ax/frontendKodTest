export interface Funds {
  //Base information
  fundName: string;
  change1m: number;
  change1y: number;
  change3m: number;
  change3y: number;
  currency: string;

  //Extended information
  fundCompany: string;
  fundType: string;
  rate: number;
  startValue: number;
  closePrice: number;
  yearHigh: number;
  yearLow: number;
  startDate: Date;
  latestClosePriceDate: Date;
  administrativeFee: number;
  availableForMonthlySaving: boolean;
  permissions: any;
}