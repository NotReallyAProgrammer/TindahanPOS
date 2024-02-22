import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData: Array<any> = [];

  constructor() {}

  addCart(data: any) {
    let isPresent = this.cartData.some(function (el: any) {
      return el.itemName == data.itemName;
    });

    if (isPresent) {
      this.cartData.forEach((items) => {
        if (items.itemName === data.itemName) {
          items.itemQty++;
        }
      });
    } else {
      this.cartData.push({ ...data, itemQty: 1 });
    }
  }

  addQuantity(name: string) {
    let item = this.cartData.find((i) => i.itemName === name);

    if (item) {
      item.itemQty++;
    }
  }

  decreaseQuantity(name: string) {
    let item = this.cartData.find((i) => i.itemName === name);

    if (item) {
      item.itemQty--;
    }
  }

  getTotal() {
    return this.cartData.reduce((acc, item) => {
      return acc + item.itemPrice * item.itemQty;
    }, 0);
  }

  cartDelete(item: any) {
    this.cartData = this.cartData.filter((i) => i.itemName !== item.itemName);
  }
}
