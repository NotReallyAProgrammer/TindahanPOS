import { Cart } from './cart';

export interface CreditName {
  creditName: string;
  subTotal: number;
}

export interface CreditTotal {
  subTotal: number;
}

export interface Credit {
  creditDate: string;
  creditTime: string;
  creditItems: Cart[];
  creditTotal: number;
  open: boolean;
}

export interface CreditPayment {
  paymentDate: string;
  paymentTime: string;
  paymentPaid: number;
  paymentTotal: number;
  paymentNewTotal: number;
}
