import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, map } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  dashService = inject(DashboardService);
  cartService = inject(CartService);

  $catData!: Observable<Array<any>>;
  $itemData!: Observable<Array<any>>;

  isViewAll: boolean = false;
  quantity: number = 1;
  itemHeader: string = 'All Items';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isViewAll = false;

    this.$catData = this.dashService.loadCategories();
    this.$itemData = this.dashService.loadItems();
  }

  plusQuantity(item: any): void {
    this.cartService.addQuantity(item.itemName);
  }
  minusQuantity(item: any): void {
    this.cartService.decreaseQuantity(item.itemName);
    if (item.itemQty <= 0) {
      this.cartService.cartDelete(item);
    }
  }

  filterCat(val: string) {
    this.isViewAll = !this.isViewAll;
    this.$itemData = this.dashService.loadItems();
    this.itemHeader = val;

    this.$itemData = this.$itemData.pipe(
      map((item) => {
        return item.filter((item) => item.itemCategory === val);
      })
    );
  }

  addToCart(data: any) {
    if (this.cartService.cartData) {
      let cart: Cart = {
        itemImg: data.itemImg,
        itemName: data.itemName,
        itemPrice: data.itemSelling,
        itemQty: this.quantity,
      };

      this.cartService.addCart(cart);
    }
  }
}
