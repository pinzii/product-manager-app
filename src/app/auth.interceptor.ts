import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth/pages/auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const token = auth.getToken();
  
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
   
  return next(authReq);
};
