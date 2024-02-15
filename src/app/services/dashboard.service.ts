import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from '@angular/fire/firestore';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;
  uid: string = JSON.parse(localStorage.getItem('user') || '{}').uid;

  constructor(private firestore: Firestore, private storage: Storage) {}

  //Loading User From Firestore
  loadUser() {
    const dbInstance = collection(this.firestore, `${this.email}`);
    return collectionData(dbInstance, { idField: 'id' });
  }

  loadCategories() {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/categories/${this.uid}`
    );
    return collectionData(dbInstance, { idField: 'id' });
  }

  saveCategory(data: object) {
    const filepath = `categoryIMG/${Date.now}`;

    const dbInstance = collection(
      this.firestore,
      `${this.email}/categories`,
      this.uid
    );

    return addDoc(dbInstance, data).then(() => {
      console.log('Save Data Success');
    });
  }

  //UPLOAD IMG TO FIREBASE
  // uploadImg(selectedImg: any, data: any): void {
  //   const filepath = `categoryIMG/${Date.now}`;

  //   this.storage.upload(filepath, selectedImg).then(() => {
  //     console.log('Image Uploaded');

  //     this.storage
  //       .ref(filepath)
  //       .getDownloadURL()
  //       .subscribe((url) => {
  //         data.categoryImg = url;
  //       });
  //   });
  // }

  async uploadImage(imgUrl: any, data: any) {
    const filepath = `categoryIMG/${Date.now}`;
    const storageRef = ref(this.storage, filepath);
    const uploadTask = await uploadBytes(storageRef, imgUrl);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
  }
}
