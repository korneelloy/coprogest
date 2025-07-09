import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ChargeLine } from '../../model/chargeLine';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChargeLineService {
  private url = environment.apiBaseUrl + 'chargelines';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<ChargeLine[]> {
    return this.http
      .get<ChargeLine[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched charge lines')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<ChargeLine> {
    return this.http
      .get<ChargeLine>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched charge line id=${id}`)),
        catchError(this.handleError)
      );
  }


  create(chargeLine: ChargeLine): Observable<ChargeLine> {
    return this.http
      .post<ChargeLine>(this.url, chargeLine, { withCredentials: true })
      .pipe(
        tap((newChargeLine) => console.log(`Created call date id=${newChargeLine.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, chargeLine: ChargeLine): Observable<ChargeLine> {
    return this.http
      .put<ChargeLine>(`${this.url}/${id}`, chargeLine, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated charge line id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted charge line id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
