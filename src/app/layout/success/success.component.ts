import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  router = inject(Router);
  timer!: any;

  counter: number = 10;

  ngOnInit() {
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;

      if (this.counter === 0) {
        clearInterval(intervalId);
        this.navigateHome();
      }
    }, 1000);
  }

  navigateHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
