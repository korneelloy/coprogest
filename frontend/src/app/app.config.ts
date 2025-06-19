import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/interceptors/auth-interceptor';

registerLocaleData(localeFr);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' }

  ]
};
