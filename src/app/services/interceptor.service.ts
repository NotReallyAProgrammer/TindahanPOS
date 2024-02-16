import { Injectable, inject } from '@angular/core';
import { LoadingService } from './loading.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private loader = inject(LoadingService);

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}
