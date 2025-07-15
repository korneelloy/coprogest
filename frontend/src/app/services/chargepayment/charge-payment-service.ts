import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ChargePayment } from '../../model/chargepayment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChargePaymentService {
  private url = environment.apiBaseUrl + 'chargepayments';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<ChargePayment[]> {
    return this.http
      .get<ChargePayment[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all charge payment')),
        catchError(this.handleError)
      );
  }

  fetchAllPerPerson(personId: string): Observable<ChargePayment[]> {
    return this.http
      .get<ChargePayment[]>(`${this.url}/fetchallperperson/${personId}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all charge payment per person')),
        catchError(this.handleError)
      );
  }
  

  fetchById(id: string): Observable<ChargePayment> {
    return this.http
      .get<ChargePayment>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched charge payment  id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(chargePayment: ChargePayment): Observable<ChargePayment> {
    return this.http
      .post<ChargePayment>(this.url, chargePayment, { withCredentials: true })
      .pipe(
        tap((newChargePayment) => console.log(`Created document id=${newChargePayment.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, chargePayment: ChargePayment): Observable<ChargePayment> {
    return this.http
      .put<ChargePayment>(`${this.url}/${id}`, chargePayment, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated charge payment id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted charge payment id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
