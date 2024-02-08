import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSuccess: boolean = false;

  // inject
  authService = inject(AuthenticationService);
  router = inject(Router);

  onSubmit(value: any) {
    this.authService
      .login(value.email, value.password)
      .then(() => {
        this.authService.loadUser();
        console.log(localStorage.getItem('user'));
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.isSuccess = !this.isSuccess;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      });
  }
}
