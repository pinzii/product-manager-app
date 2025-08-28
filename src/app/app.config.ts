import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, LOCALE_ID, DEFAULT_CURRENCY_CODE  } from '@angular/core';
import { provideRouter }                                                        from '@angular/router';
import { provideHttpClient, withInterceptors }                                  from '@angular/common/http';
import { authInterceptor }                                                      from './auth.interceptor';
import { routes }                                                               from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';

// NgRx clásicos
import { StoreModule }            from '@ngrx/store';
import { EffectsModule }          from '@ngrx/effects';
import { StoreDevtoolsModule }    from '@ngrx/store-devtools';

import { productReducer }         from './state/product.reducer';
import { ProductEffects }         from './state/product.effects';

import { registerLocaleData} from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCO);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' },
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
      }),
      MatSnackBarModule
    ),
     provideAnimations(),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3500, horizontalPosition: 'center', verticalPosition: 'bottom' } },
    importProvidersFrom(BrowserAnimationsModule)
  ]
};
