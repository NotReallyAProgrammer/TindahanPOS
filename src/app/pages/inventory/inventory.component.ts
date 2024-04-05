import { Component, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  //Inject
  dashService = inject(DashboardService);

  isAddMenuOpen: boolean = false;
  $data!: Observable<Array<any>>;
  $catData!: Observable<Array<any>>;

  itemCount!: number;
  totalVal!: number;
  totalSelling!: number;

  catCount!: number;

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.$data = this.dashService.loadItems();
    this.$catData = this.dashService.loadCategories();

    this.$catData.subscribe((data) => {
      this.catCount = data.length;
    });

    this.$data.subscribe((data) => {
      this.itemCount = data.length;

      this.totalVal = data
        .flat()
        .reduce((sum, el) => (sum += el.itemSelling * el.itemQty), 0);

      this.totalSelling = data
        .flat()
        .reduce((sum, el) => (sum += el.itemPrice * el.itemQty), 0);
    });
  }

  openMenu(): void {
    this.isAddMenuOpen = !this.isAddMenuOpen;
  }
}
