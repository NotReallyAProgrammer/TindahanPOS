import { Cart } from './cart';

export interface Credit {
  creditName: string;
  creditDate: string;
  creditTime: string;
  creditItems: Cart[];
  creditTotal: number;
}
