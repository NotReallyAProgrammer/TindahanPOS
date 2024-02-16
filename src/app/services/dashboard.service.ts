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
  deleteObject,
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

  //Upload Image
  async uploadImage(imgUrl: any, data: any) {
    const filepath = `categoryIMG/${Date.now()}`;
    const storageRef = ref(this.storage, filepath);
    const uploadTask = await uploadBytes(storageRef, imgUrl);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    data.categoryImg = downloadUrl;
    this.saveCategory(data);
  }

  deleteCategory(id: string) {
    const docInstance = doc(
      this.firestore,
      `${this.email}/categories/${this.uid}`,
      id
    );
    return deleteDoc(docInstance).then(() => {
      console.log('SUCCESS');
    });
  }

  deleteImg(data: any) {
    const deleteRef = ref(this.storage, data.url);
    return deleteObject(deleteRef).then(() => {
      this.deleteCategory(data.id);
    });
  }
}
