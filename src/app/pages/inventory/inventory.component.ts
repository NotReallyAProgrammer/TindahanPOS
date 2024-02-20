import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  //Inject
  dashService = inject(DashboardService);

  isAddMenuOpen: boolean = false;
  $data!: Observable<Array<any>>;

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.$data = this.dashService.loadItems();
  }

  openMenu(): void {
    this.isAddMenuOpen = !this.isAddMenuOpen;
  }
}
