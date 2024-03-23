import { Component, inject } from '@angular/core';
import { Categories } from '../../models/categories';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, map } from 'rxjs';
import { ImgtowebpService } from '../../services/imgtowebp.service';
import { LoadingService } from '../../services/loading.service';
import { HttpClient } from '@angular/common/http';
import { FilterItems } from '../../models/items';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss',
})
export class AllItemsComponent {
  // INJECT
  dashService = inject(DashboardService);
  imgConverter = inject(ImgtowebpService);
  loader = inject(LoadingService);
  http = inject(HttpClient);

  //
  isCategory: boolean = false;
  isDelCategory: boolean = false;
  isViewAll: boolean = false;
  imgSrc!: any;
  selectedImg: any;

  itemHeader: string = 'All Items';
  webpIMG!: string;

  //observable
  $data!: Observable<Array<any>>;
  $Item!: Observable<Array<any>>;
  $itemFilter!: Observable<any[]>;
  loading$ = this.loader.loading$;

  ngOnInit(): void {
    this.loadData();
  }

  openCategory(): void {
    this.isCategory = !this.isCategory;
  }

  openDelCategory(): void {
    this.isDelCategory = !this.isDelCategory;
  }

  // loadData
  loadData(): void {
    this.isViewAll = false;
    this.$data = this.dashService.loadCategories();
    this.$Item = this.dashService.loadItems();
  }

  //filter by category
  filterCat(val: string) {
    this.isViewAll = !this.isViewAll;
    this.$Item = this.dashService.loadItems();
    this.itemHeader = val;

    this.$Item = this.$Item.pipe(
      map((item) => {
        return item.filter((item) => item.itemCategory === val);
      })
    );
  }

  //filter by search
  onSearch(filter: string) {
    this.$Item = this.dashService.loadItems();
    this.$Item = this.$Item.pipe(
      map((item) => {
        return item.filter((item) => item.itemName === filter);
      })
    );
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
    let where = 'Category';

    this.isCategory = !this.isCategory;

    let categoryData: Categories = {
      category: val.category,
      categoryImg: this.imgSrc,
    };

    this.dashService
      .uploadImage(this.selectedImg, categoryData, where)
      .then(() => {});
  }

  //Delete Category
  deleteCategory(data: any) {
    console.log(data);

    this.dashService.deleteImg(data);
  }
}
