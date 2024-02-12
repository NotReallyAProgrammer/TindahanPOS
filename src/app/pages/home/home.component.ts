import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLogout: boolean = false;

  user$!: Observable<Array<any>>;

  authService = inject(AuthenticationService);
  router = inject(Router);
  dashService = inject(DashboardService);

  email: string = JSON.parse(localStorage.getItem('user') || '{}').email;

  ngOnInit(): void {
    this.loadName();
  }

  loadName() {
    this.user$ = this.dashService.loadUser();
  }

  logoutDiag(): void {
    this.isLogout = !this.isLogout;
  }

  yes() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
