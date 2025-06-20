import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from '../../model/person';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUser: Person | null = null;
  private url = environment.apiBaseUrl + 'persons';


  constructor(private http: HttpClient) {}

  setUser(user: Person): void {
    this.currentUser = user;
  }

  getUser(): Person | null {
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  loadUserFromServer(): Observable<any> {
    return this.http.get<Person>(`${this.url}/me`, {
      withCredentials: true
    }).pipe(
      tap(user => {
        this.currentUser = user;
      }),
      catchError(err => {
        this.currentUser = null;
        return of(null); 
      })
    );
  }
}
