import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Items } from '../../models/items';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  //inject
  dashService = inject(DashboardService);

  imgSrc!: any;
  selectedImg: string = '';
  itemBarcode: string = '';

  //
  $catData!: Observable<Array<any>>;

  ngOnInit() {
    this.loadItem();
  }

  loadItem(): void {
    this.$catData = this.dashService.loadCategories();
  }

  //showing preview of img
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(val: any) {
    console.log(val);

    let itemData: Items = {
      itemImg: this.selectedImg,
      itemName: val.itemName,
      itemQty: val.itemQty,
      itemPrice: val.itemPrc,
      itemSelling: val.itemSel,
      itemCategory: val.itemCat,
    };

    this.dashService.uploadImage(this.selectedImg, itemData);
  }
}
