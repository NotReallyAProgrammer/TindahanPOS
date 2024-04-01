import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  QuerySnapshot,
  getDocs,
} from '@angular/fire/firestore';

import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;
  uid: string = JSON.parse(localStorage.getItem('user') || '{}').uid;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  loadItems() {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/items/${this.uid}`
    );
    return collectionData(dbInstance, { idField: 'id' });
  }

  //filter by category
  async filterByCat(val: string) {
    const itemsRef = collection(
      this.firestore,
      `${this.email}/items/${this.uid}`
    );

    const q = query(itemsRef, where(val, '==', true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return doc;
    });
  }

  saveCategory(data: object) {
    const filepath = `categoryIMG/${Date.now}`;

    const dbInstance = collection(
      this.firestore,
      `${this.email}/categories`,
      this.uid
    );

    return addDoc(dbInstance, data).then(() => {
      this.toastr.success('Category successfully added.', 'Category');
    });
  }

  //Upload Image
  async uploadImage(imgUrl: any, data: any, where: string) {
    let filePathName = '';

    if (where === 'Items') {
      filePathName = 'itemIMG';
    } else {
      filePathName = 'categoryIMG';
    }
    const filepath = `${filePathName}/${Date.now()}`;
    const storageRef = ref(this.storage, filepath);
    const uploadTask = await uploadBytes(storageRef, imgUrl);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    if (where === 'Items') {
      data.itemImg = downloadUrl;
      this.saveItem(data);
    } else if (where === 'Category') {
      data.categoryImg = downloadUrl;
      this.saveCategory(data);
    }
  }

  deleteCategory(id: string) {
    const docInstance = doc(
      this.firestore,
      `${this.email}/categories/${this.uid}`,
      id
    );
    return deleteDoc(docInstance).then(() => {
      this.toastr.success('Category Deleted.', 'Category');
    });
  }

  deleteImg(data: any) {
    const deleteRef = ref(this.storage, data.url);
    return deleteObject(deleteRef).then(() => {
      this.deleteCategory(data.id);
    });
  }

  //Save Item
  saveItem(data: any) {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/items`,
      this.uid
    );
    return addDoc(dbInstance, data).then(() => {
      this.toastr.success('Item successfully added.', 'Item');
    });
  }

  //Upload Receipt
  saveReceipt(data: object) {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/receipt`,
      this.uid
    );
    return addDoc(dbInstance, data).then(() => {
      console.log('Purchase Success');
    });
  }

  //Saving Collection in Name
  // saveCredit(creditName: string, data: object) {
  //   const dbInstance = collection(
  //     this.firestore,
  //     `${this.email}/credits/${creditName}`
  //   );
  //   return addDoc(dbInstance, data).then(() => {
  //     console.log('Credit Save');
  //   });
  // }
}
