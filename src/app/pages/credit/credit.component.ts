import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  isAdd: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.$data = this.creditService.loadCredit();
  }

  addNew() {
    this.isAdd = !this.isAdd;
  }
  addClose() {
    this.isAdd = false;
  }

  add(val: any) {
    let name: CreditName = {
      creditName: val.name,
    };

    this.creditService.saveName(name);
    this.isAdd = false;
  }
}
