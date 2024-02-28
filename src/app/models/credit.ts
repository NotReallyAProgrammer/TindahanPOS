import { Cart } from './cart';

export interface CreditName {
  creditName: string;
}

export interface Credit {
  creditDate: string;
  creditTime: string;
  creditItems: Cart[];
  creditTotal: number;
}
