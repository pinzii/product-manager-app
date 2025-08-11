import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'pm_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    // Simulación: valida que vengan datos y “emite” un token
    if (!email || !password) {
      return throwError(() => new Error('Credenciales inválidas'));
    }
    const fake = { token: 'FAKE-JWT-' + Math.random().toString(36).slice(2) };
    return of(fake).pipe(
      delay(600),
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
