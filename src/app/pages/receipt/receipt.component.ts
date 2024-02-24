import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Receipt } from '../../models/receipt';
import { DatePipe, formatDate } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
})
export class ReceiptComponent {
  cartService = inject(CartService);
  dashService = inject(DashboardService);

  @ViewChild('payment') payment: ElementRef | undefined;
  receiptNo: number = Date.now();
  date: string = formatDate(new Date(), 'MM/dd/yyyy ', 'en-US');
  time: string = formatDate(new Date(), 'hh:mm a', 'en-US');

  change: number = 0;
  paymentInp: number = 0;

  errorPayment: boolean = false;

  paymentVal(value: any) {
    //  const paymentInput = this.payment?.nativeElement as HTMLInputElement;

    // console.log(value, paymentVal.value);
    this.paymentInp = Number(value);

    if (this.paymentInp < this.cartService.getTotal()) {
      this.errorPayment = !this.errorPayment;
    } else {
      this.change = value - this.cartService.getTotal();
      this.errorPayment = !this.errorPayment;
    }
  }

  paid() {
    if (this.paymentInp === 0) {
      this.errorPayment = !this.errorPayment;
    } else {
      let receiptData: Receipt = {
        receiptNo: this.receiptNo,
        receiptDate: this.date,
        receiptTime: this.time,
        receiptPurchase: this.cartService.cartData,
        receiptSubtotal: this.cartService.getTotal(),
        receiptPayment: this.paymentInp,
        receiptChange: this.change,
      };

      this.dashService.saveReceipt(receiptData);
    }
  }
}
