import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isLogout: boolean = false;

  authService = inject(AuthenticationService);
  router = inject(Router);

  logoutDiag(): void {
    this.isLogout = !this.isLogout;
  }

  yes() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
