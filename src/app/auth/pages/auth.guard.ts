import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const hasToken = !!auth.getToken();
  if (!hasToken) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
