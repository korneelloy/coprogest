import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AgNotice } from '../../model/agnotice';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AgNoticeService {
  private url = environment.apiBaseUrl + 'agnotices';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<AgNotice[]> {
    return this.http
      .get<AgNotice[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag notices')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<AgNotice> {
    return this.http
      .get<AgNotice>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched ag notice id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(agNotice: AgNotice): Observable<AgNotice> {
    return this.http
      .post<AgNotice>(this.url, agNotice, { withCredentials: true })
      .pipe(
        tap((newAgNotice) => console.log(`Created ag notice id=${newAgNotice.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, agNotice: AgNotice): Observable<AgNotice> {
    return this.http
      .put<AgNotice>(`${this.url}/${id}`, agNotice, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated ag notice id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted ag notice id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
