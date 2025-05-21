import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { localStorageMetaReducer } from './store/meta-reducers/local-storage.metareducer';
import { cartReducer } from './store/reducers/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      { cart: cartReducer },
      {
        metaReducers: [localStorageMetaReducer],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
};
