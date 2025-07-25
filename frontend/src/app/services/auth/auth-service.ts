import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';

import { SessionService } from '../../services/session/session-service';
import { environment } from '../../../environments/environment';
import { Person } from '../../../app/model/person';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiBaseUrl + 'login';
  connectedUser: Person | null = null;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.url, credentials, { withCredentials: true }).pipe(
      tap((res) => {
        this.sessionService.setUser(res.person);
        this.router.navigate(['/']);
      }),
      catchError(err => {
        console.error('Login failed:', err);
        return throwError(() => err);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.url}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.sessionService.clearUser();
      }),
      catchError(err => {
        console.error('Logout failed:', err);
        return throwError(() => err);
      })
    );
  }
  

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }
}
