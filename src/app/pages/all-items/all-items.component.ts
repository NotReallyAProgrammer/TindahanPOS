import { Component, inject } from '@angular/core';
import { Categories } from '../../models/categories';
import { DashboardService } from '../../services/dashboard.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImgtowebpService } from '../../services/imgtowebp.service';
import { LoadingService } from '../../services/loading.service';
import { HttpClient } from '@angular/common/http';

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
  imgSrc!: any;
  selectedImg: any;

  webpIMG!: string;

  //observable
  $data!: Observable<Array<any>>;
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
    this.$data = this.dashService.loadCategories();
    console.log(this.$data);
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
    this.isCategory = !this.isCategory;

    let categoryData: Categories = {
      category: val.category,
      categoryImg: this.imgSrc,
    };

    this.dashService.uploadImage(this.selectedImg, categoryData).then(() => {});
  }

  //Delete Category
  deleteCategory(data: any) {
    console.log(data);

    this.dashService.deleteImg(data);
  }
}
