import { Cart } from './cart';

export interface Receipt {
  receiptNo: number;
  receiptDate: string;
  receiptTime: string;
  receiptPurchase: Cart[];
  receiptSubtotal: number;
  receiptPayment: number;
  receiptChange: number;
}
