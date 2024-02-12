import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  collection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;

  constructor(private firestore: Firestore) {}

  //Loading Data From Firestore
  loadUser() {
    const dbInstance = collection(this.firestore, `${this.email}`);
    return collectionData(dbInstance, { idField: 'id' });
  }
}
