import { catchError, of } from 'rxjs';
import { SessionService } from './services/session/session-service';

export function initializeSession(sessionService: SessionService): () => Promise<void> {
  return () =>
    sessionService.loadUserFromServer()
      .pipe(
        catchError(() => of(null)) // just to be safe
      )
      .toPromise()
      .then(() => void 0); // return nothing, just resolve
}
