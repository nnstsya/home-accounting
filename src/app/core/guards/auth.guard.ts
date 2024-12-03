import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router);
    const isAuthenticated = !!localStorage.getItem('user');

    return isAuthenticated || router.navigateByUrl('/auth/login');
  };
}
