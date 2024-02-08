import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  //LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //REGISTER
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loadUser() {
    this.auth.onAuthStateChanged((user) => {
      // console.log(JSON.parse(JSON.stringify(user)));

      //saving user in local storage
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
