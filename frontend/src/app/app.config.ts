import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
  APP_INITIALIZER
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/interceptors/auth-interceptor';
import { routes } from './app.routes';

import { SessionService } from './services/session/session-service';
import { initializeSession } from '../app/session-init';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' },

    SessionService,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeSession,
      deps: [SessionService],
      multi: true
    }
  ]
};
