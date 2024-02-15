import { Component, inject } from '@angular/core';
import { Categories } from '../../models/categories';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';
import { ImgtowebpService } from '../../services/imgtowebp.service';

import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss',
})
export class AllItemsComponent {
  isCategory: boolean = false;
  imgSrc!: any;
  selectedImg: any;

  webpIMG!: string;

  //observable
  $data!: Observable<Array<any>>;

  dashService = inject(DashboardService);
  imgConverter = inject(ImgtowebpService);
  private readonly storage: Storage = inject(Storage);
  ngOnInit(): void {
    this.loadData();
  }

  openCategory(): void {
    this.isCategory = !this.isCategory;
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
    //CONVERT IMG TO WEBP
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let userImg = new Image();
    userImg.src = val.categoryImg;

    userImg.onload = function () {
      canvas.width = userImg.width;
      canvas.height = userImg.height;
      ctx?.drawImage(userImg, 0, 0);
    };

    let categoryData: Categories = {
      category: val.category,
      categoryImg: canvas.toDataURL('image/webp', 1),
    };

    this.dashService.uploadImage(this.imgSrc, categoryData).then(() => {
      console.log('success');
    });
  }
}
