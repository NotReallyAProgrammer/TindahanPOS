import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Receipt } from '../../models/receipt';
import { DatePipe, formatDate } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Credit, CreditName, CreditTotal } from '../../models/credit';
import { Observable } from 'rxjs';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
})
export class ReceiptComponent {
  cartService = inject(CartService);
  dashService = inject(DashboardService);
  creditService = inject(CreditService);

  $name!: Observable<Array<any>>;
  $subTotal!: Observable<Array<any>>;
  idHolder!: string;

  @ViewChild('payment') payment: ElementRef | undefined;
  receiptNo: number = Date.now();
  date: string = formatDate(new Date(), 'MM/dd/yyyy ', 'en-US');
  time: string = formatDate(new Date(), 'hh:mm a', 'en-US');

  change: number = 0;
  paymentInp: number = 0;

  errorPayment: boolean = false;
  isCredit: boolean = false;

  ngOnInit() {
    this.loadNames();
  }

  loadNames() {
    this.$name = this.creditService.loadCredit();
  }

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

  saveId(id: string) {
    this.idHolder = id;
    console.log(this.idHolder);
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

  credit() {
    let credit: Credit = {
      creditDate: this.date,
      creditTime: this.time,
      creditItems: this.cartService.cartData,
      creditTotal: this.cartService.getTotal(),
    };

    let total: CreditTotal = {
      subTotal: this.cartService.getTotal(),
    };

    this.creditService.addTotal(this.idHolder, total, credit);

    this.isCredit = false;
  }

  creditTab() {
    this.isCredit = !this.isCredit;
  }

  closeCredit() {
    this.isCredit = false;
  }
}
