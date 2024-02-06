import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AllItemsComponent } from './pages/all-items/all-items.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { CreditComponent } from './pages/credit/credit.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignUpComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'inventory',
    component: InventoryComponent,
  },

  {
    path: 'add-item',
    component: AddItemComponent,
  },
  {
    path: 'all-items',
    component: AllItemsComponent,
  },

  {
    path: 'sales',
    component: SalesComponent,
  },

  {
    path: 'receipt',
    component: ReceiptComponent,
  },

  {
    path: 'credit',
    component: CreditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
