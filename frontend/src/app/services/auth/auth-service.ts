import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiBaseUrl + 'login';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.url, credentials).pipe(
      tap((res) => {

        /**httponly service  */
        localStorage.setItem('authToken', res.token);
        console.log(res.token.personId);
        localStorage.setItem('id', JSON.stringify(res.person.id));
        localStorage.setItem('email', JSON.stringify(res.person.email));
        localStorage.setItem('frstName', JSON.stringify(res.person.first_name));
        localStorage.setItem('lastName', JSON.stringify(res.person.last_name));
        localStorage.setItem('role', JSON.stringify(res.person.role));

        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}