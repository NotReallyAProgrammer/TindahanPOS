import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router: Router = inject(Router);
  const user = localStorage.getItem('user');
  const protectedRoutes: string[] = [
    '/home',
    '/inventory',
    '/add-item',
    '/all-items',
    '/sales',
    '/receipt',
    '/credit',
  ];

  return protectedRoutes.includes(state.url) && !user
    ? router.navigate(['/'])
    : false;
};
