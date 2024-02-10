import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  //LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //REGISTER
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  posName(name: string, email: string) {
    let data = { Name: name };
    const dbInstance = collection(this.firestore, `${email}`);
    return addDoc(dbInstance, data);
  }

  //LOGOUT
  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  //SAVING USER ON LOCAL STORAGE
  loadUser() {
    this.auth.onAuthStateChanged((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
