import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  isPassword: boolean = false;
  isExist: boolean = false;

  //inject
  authService = inject(AuthenticationService);

  register(val: any) {
    if (val.password !== val.confirmPassword) {
      this.isPassword = !this.isPassword;
      setTimeout(() => {
        this.isPassword = false;
      }, 4000);
    } else {
      this.authService
        .register(val.email, val.password)

        .then(() => {
          console.log('SUCCESS');
          this.authService.posName(val.name, val.email);
        })
        .catch((err) => {
          this.isExist = !this.isExist;
          setTimeout(() => {
            this.isExist = false;
          }, 4000);
        });
    }
  }
}
