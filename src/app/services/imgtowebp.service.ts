import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImgtowebpService {
  imgConvert(imgPath: string) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let userImg = new Image();
    userImg.src = imgPath;

    userImg.onload = function () {
      canvas.width = userImg.width;
      canvas.height = userImg.height;
      ctx?.drawImage(userImg, 0, 0);

      //convert canvas to webp
      canvas.toDataURL('image/webp', 1);
    };
  }
}
