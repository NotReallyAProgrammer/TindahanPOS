import { Component, inject } from '@angular/core';
import { Observable, toArray } from 'rxjs';
import { CreditService } from '../../services/credit.service';
import { CreditName, CreditPayment, CreditTotal } from '../../models/credit';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss',
})
export class CreditComponent {
  creditService = inject(CreditService);

  $data!: Observable<Array<any>>;
  $creditData!: Observable<Array<any>>;
  $paymentData!: Observable<Array<any>>;

  isAdd: boolean = false;
  isMore: boolean = false;
  isItem: boolean = false;
  navSelect: boolean = false;
  nameHolder!: string;
  subTotal!: number;
  newTotal!: number;
  totalCredit!: any;

  creditId!: string;

  showItem!: Array<any>;

  date: string = formatDate(new Date(), 'MM/dd/yyyy ', 'en-US');

  time: string = formatDate(new Date(), 'hh:mm a', 'en-US');
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.$data = this.creditService.loadCredit();
    this.$data.subscribe((data) => {
      // console.log(data.reduce((sum, el) => (sum += el.subTotal), 0));

      this.totalCredit = data
        .flat()
        .reduce((sum, el) => (sum += el.subTotal), 0);
    });
  }

  addNew() {
    this.isAdd = !this.isAdd;
  }
  addClose(where: string) {
    if (where == 'Add') {
      this.isAdd = false;
    } else if (where == 'View') {
      this.isMore = false;
    }
  }

  add(val: any) {
    let name: CreditName = {
      creditName: val.name,
      subTotal: 0,
    };

    this.creditService.saveName(name);
    this.isAdd = false;
  }

  viewMore(data: any) {
    this.isMore = !this.isMore;
    this.nameHolder = data.creditName;
    this.subTotal = data.subTotal;
    this.creditId = data.id;
    this.$creditData = this.creditService.loadCreditInfo(data.id);
  }

  viewItems(data: any) {
    data.open = !data.open;

    setTimeout(() => {
      data.open = false;
    }, 5000);
    this.isItem = !this.isItem;
  }

  selectTab(): void {
    this.navSelect = false;
  }

  viewHistory(): void {
    this.navSelect = true;
    this.$paymentData = this.creditService.loadPayments(this.creditId);
  }

  payment(f: any) {
    this.newTotal = this.subTotal - f.Payment;
    let paymentInfo: CreditPayment = {
      paymentDate: this.date,
      paymentTime: this.time,
      paymentPaid: f.Payment,
      paymentTotal: this.subTotal,
      paymentNewTotal: this.newTotal,
    };

    let total: CreditTotal = {
      subTotal: this.newTotal,
    };

    this.creditService.creditPayment(paymentInfo, this.creditId, total);

    this.isMore = false;
  }
}
