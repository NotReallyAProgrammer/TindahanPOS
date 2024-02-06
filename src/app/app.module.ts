import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

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
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
