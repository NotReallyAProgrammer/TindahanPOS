import { Component, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CreditService } from '../../services/credit.service';
import { CreditName } from '../../models/credit';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss',
})
export class CreditComponent {
  creditService = inject(CreditService);

  $data!: Observable<Array<any>>;
  $creditData!: Observable<Array<any>>;

  isAdd: boolean = false;
  isMore: boolean = false;
  isItem: boolean = false;
  nameHolder!: string;
  subTotal!: number;

  showItem!: Array<any>;
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.$data = this.creditService.loadCredit();
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
    };

    this.creditService.saveName(name);
    this.isAdd = false;
  }

  viewMore(data: any) {
    this.isMore = !this.isMore;
    this.nameHolder = data.creditName;
    this.subTotal = data.subTotal;

    this.$creditData = this.creditService.loadCreditInfo(data.id);
  }

  viewItems(data: any) {
    data.open = !data.open;
    this.isItem = !this.isItem;
  }
}
