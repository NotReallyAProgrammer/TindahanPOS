import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AllItemsComponent } from './pages/all-items/all-items.component';
import { SalesComponent } from './pages/sales/sales.component';

import { ReceiptComponent } from './pages/receipt/receipt.component';
import { CreditComponent } from './pages/credit/credit.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

// FIREBASE
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent,
    AddItemComponent,
    AllItemsComponent,
    SalesComponent,

    ReceiptComponent,
    CreditComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyACrUMesiaXgwL9JXpX5KDgQzcbGQwRJfY',
        authDomain: 'tindahanpos.firebaseapp.com',
        projectId: 'tindahanpos',
        storageBucket: 'tindahanpos.appspot.com',
        messagingSenderId: '564082245258',
        appId: '1:564082245258:web:0b788253e8f4fdb4ab3773',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
