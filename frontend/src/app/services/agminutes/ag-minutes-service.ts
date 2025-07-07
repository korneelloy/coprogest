import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AgMinutes } from '../../model/agminutes';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AgMinutesService {
  private url = environment.apiBaseUrl + 'agminutes';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<AgMinutes[]> {
    return this.http
      .get<AgMinutes[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag minutes')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<AgMinutes> {
    return this.http
      .get<AgMinutes>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched ag minute id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(agMinutes: AgMinutes): Observable<AgMinutes> {
    return this.http
      .post<AgMinutes>(this.url, agMinutes, { withCredentials: true })
      .pipe(
        tap((newAgMinutes) => console.log(`Created ag minutes id=${newAgMinutes.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, agMinutes: AgMinutes): Observable<AgMinutes> {
    return this.http
      .put<AgMinutes>(`${this.url}/${id}`, agMinutes, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated ag minutes id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted ag minutes id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
