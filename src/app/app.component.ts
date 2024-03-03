import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loader = inject(LoadingService);
  http = inject(HttpClient);

  loading$ = this.loader.loading$;
}
