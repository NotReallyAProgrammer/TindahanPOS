import { Component } from '@angular/core';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss',
})
export class AllItemsComponent {
  isCategory: boolean = false;
  imgSrc: any = 'https://placehold.co/600x400';
  selectedImg: any;
  openCategory(): void {
    this.isCategory = !this.isCategory;
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

  onSubmit(val: any) {}
}
