import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { productsReducer } from './store/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideAnimationsAsync(),
    importProvidersFrom(StoreModule.forRoot({}),StoreModule.forFeature('products', productsReducer)),
  ]
};
