import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ChargeCall } from '../../model/chargecall';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChargeCallService {
  private url = environment.apiBaseUrl + 'chargecalls';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<ChargeCall[]> {
    return this.http
      .get<ChargeCall[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched charge calls')),
        catchError(this.handleError)
      );
  }

  fetchByPerson(personId: string): Observable<ChargeCall[]> {
    return this.http
    .get<ChargeCall[]>(`${this.url}/fetchbyperson/${personId}`, { withCredentials: true })
    .pipe(
      tap(() => console.log(`Fetched charge calls for person with id=${personId}`)),
      catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<ChargeCall> {
    return this.http
      .get<ChargeCall>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched charge call id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(chargeCall: ChargeCall): Observable<ChargeCall> {
    return this.http
      .post<ChargeCall>(this.url, chargeCall, { withCredentials: true })
      .pipe(
        tap((newChargeCall) => console.log(`Created charge call id=${newChargeCall.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, chargeCall: ChargeCall): Observable<ChargeCall> {
    return this.http
      .put<ChargeCall>(`${this.url}/${id}`, chargeCall, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated charge call id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted charge call id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
