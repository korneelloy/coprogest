import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Role } from '../../model/role';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = environment.apiBaseUrl + 'roles';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Role[]> {
    return this.http
      .get<Role[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched roles')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<Role> {
    return this.http
      .get<Role>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched role id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
