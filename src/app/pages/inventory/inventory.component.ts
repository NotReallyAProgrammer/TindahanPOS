import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  isAddMenuOpen: boolean = false;

  openMenu(): void {
    this.isAddMenuOpen = !this.isAddMenuOpen;
  }
}
