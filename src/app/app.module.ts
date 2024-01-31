import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AllItemsComponent } from './pages/all-items/all-items.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent,
    AddItemComponent,
    AllItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }