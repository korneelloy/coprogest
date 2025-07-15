import { SessionService } from './services/session/session-service';

export function initializeSession(sessionService: SessionService) {
  return () => sessionService.loadUserFromServer().toPromise();
}
