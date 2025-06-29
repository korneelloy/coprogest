import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CallDate } from '../../model/call_date';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CallDateService {
  private url = environment.apiBaseUrl + 'calldates';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<CallDate[]> {
    return this.http
      .get<CallDate[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched call dates')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<CallDate> {
    return this.http
      .get<CallDate>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched call date id=${id}`)),
        catchError(this.handleError)
      );
  }

  fetchAllByAgResolution(idAgResolution: string): Observable<CallDate[]> {
    return this.http
      .get<CallDate[]>(`${this.url}/byagresolution/${idAgResolution}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched call dates per resolution')),
        catchError(this.handleError)
      );
  }

  create(callDate: CallDate): Observable<CallDate> {
    return this.http
      .post<CallDate>(this.url, callDate, { withCredentials: true })
      .pipe(
        tap((newCallDate) => console.log(`Created call date id=${newCallDate.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, callDate: CallDate): Observable<CallDate> {
    return this.http
      .put<CallDate>(`${this.url}/${id}`, callDate, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated call date id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted call date id=${id}`)),
        catchError(this.handleError)
      );
  }

  deleteAllByAgResolution(idAgResolution: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/deleteallbyagresolution/${idAgResolution}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted all call date for resolution with id=${idAgResolution}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
