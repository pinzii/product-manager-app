import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                                        from '@angular/router';
import { provideHttpClient, withInterceptors }                                  from '@angular/common/http';
import { authInterceptor }                                                      from './auth.interceptor';
import { routes }                                                               from './app.routes';

// NgRx clásicos
import { StoreModule }            from '@ngrx/store';
import { EffectsModule }          from '@ngrx/effects';
import { StoreDevtoolsModule }    from '@ngrx/store-devtools';

import { productReducer }         from './state/product.reducer';
import { ProductEffects }         from './state/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1) optimización de zonas
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 2) HttpClient + interceptor
    provideHttpClient(withInterceptors([ authInterceptor ])),

    // 3) Router
    provideRouter(routes),

    // 4) Importar los módulos de NgRx
    importProvidersFrom(
      StoreModule.forRoot({ products: productReducer  }),
      EffectsModule.forRoot([ ProductEffects ]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false
      })
    )
  ]
};
