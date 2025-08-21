// src/app/core/interceptors/http-error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notify: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let msg = 'Ocurrió un error inesperado.';
        if (err.error?.message) msg = err.error.message;
        else if (err.status)    msg = `Error ${err.status}: ${err.statusText || 'Solicitud fallida'}`;

        this.notify.error(msg, { label: 'Detalles', onClick: () => console.error('HTTP error:', err) });
        return throwError(() => err);
      })
    );
  }
}
