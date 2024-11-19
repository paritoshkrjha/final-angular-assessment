import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FireAuthService } from '../core/services/fireauth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(FireAuthService);
  const router = inject(Router);

  const role = authService.getRole();
  console.log('Role:', role);

  if (role) {
    const requiredRole = route.data['role'];
    if (!requiredRole || role === requiredRole) {
      return true;
    }
  }

  router.navigate(['login'], { replaceUrl: true });
  return false;
};
