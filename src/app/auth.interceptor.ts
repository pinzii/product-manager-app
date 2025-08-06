import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('authToken');
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

   console.log('authInterceptor: request with auth', authReq);
   
  return next(authReq);
};
