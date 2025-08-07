import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { routes } from './app.routes';
import { provideStore }         from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects }       from '@ngrx/effects';
import { productReducer }       from './state/product.reducer';
import { ProductEffects }       from './state/product.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),   
    provideHttpClient(
      withInterceptors([authInterceptor])),
     provideRouter(routes),
    // NGRX Store and Effects
    provideStore({ product: productReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects([ ProductEffects ])
  ]
};
