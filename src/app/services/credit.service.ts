import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { CreditTotal } from '../models/credit';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;
  uid: string = JSON.parse(localStorage.getItem('user') || '{}').uid;

  subtotalArray!: Array<any>;

  $subTotal!: Observable<Array<any>>;
  newTotal!: number;
  constructor(private firestore: Firestore, private router: Router) {}

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

  loadSubtotal() {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/credits/${this.uid}`
    );

    return collectionData(dbInstance, { idField: 'id' });
  }

  addCreditInfo(nameId: string, data: any) {
    const dbInstance = collection(
      this.firestore,
      `${this.email}/credits/${this.uid}/${nameId}/credit-info`
    );

    return addDoc(dbInstance, data).then(() => {
      this.router.navigate(['/success']);
    });
  }

  addTotal(nameId: any, total: any, data: any) {
    const docInstance = doc(
      this.firestore,
      `${this.email}/credits/${this.uid}`,
      nameId
    );

    this.$subTotal = this.loadSubtotal();

    this.$subTotal.pipe(take(1)).subscribe({
      next: (value) => {
        let subtotal = value.find((i) => i.id === nameId);

        total.subTotal = total.subTotal + subtotal.subTotal;

        return updateDoc(docInstance, total).then(() => {
          this.addCreditInfo(nameId, data);
        });
      },
    });
  }
}
