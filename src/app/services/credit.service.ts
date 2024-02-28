import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;
  uid: string = JSON.parse(localStorage.getItem('user') || '{}').uid;

  constructor(private firestore: Firestore) {}

  loadCredit() {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/credits/${this.uid}`
    );

    return collectionData(dbInstance, { idField: 'id' });
  }

  saveName(name: object) {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/credits/${this.uid}`
    );
    return addDoc(dbInstance, name).then(() => {
      console.log('Name Save');
    });
  }

  addTotal(nameId: any, total: any) {
    const docInstance = doc(
      this.firestore,
      `${this.email}/credits/${this.uid}`,
      nameId
    );
    return updateDoc(docInstance, total);
  }
}
