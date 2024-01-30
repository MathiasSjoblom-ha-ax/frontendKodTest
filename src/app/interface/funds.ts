export interface Funds {
  fundName: string;
  
  change1m: number;
  change1y: number;
  change3m: number;
  change3y: number;

  currency: string;
  fundType: string;
}