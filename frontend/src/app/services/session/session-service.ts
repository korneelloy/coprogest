import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


import { Person } from '../../model/person';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUser: Person | null = null;
  private url = environment.apiBaseUrl + 'persons';
  private userSubject = new BehaviorSubject<Person | null>(null);
  public user$: Observable<Person | null> = this.userSubject.asObservable();



  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setUser(user: Person): void {
    this.userSubject.next(user);

  }

  getUser(): Person | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  loadUserFromServer(): Observable<any> {
    return this.http.get<Person>(`${this.url}/me`, {
      withCredentials: true
    }).pipe(
      tap(user => {
        this.currentUser = user;
        this.userSubject.next(user);
      }),
      catchError(err => {
        this.currentUser = null;
        this.userSubject.next(null);
        /*
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
          */
        return of(null);
      })
    );
  }
  
}
