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
import { authGuard } from './guards/auth.guard';
import { SuccessComponent } from './layout/success/success.component';

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
    canActivate: [authGuard],
  },

  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [authGuard],
  },

  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [authGuard],
  },
  {
    path: 'all-items',
    component: AllItemsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'receipt',
    component: ReceiptComponent,
    canActivate: [authGuard],
  },

  {
    path: 'credit',
    component: CreditComponent,
    canActivate: [authGuard],
  },

  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
