import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ChargeLineChargePayment } from '../../model/chargelinechargepayment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChargeLineChargePaymentService {
  private url = environment.apiBaseUrl + 'chargelinechargepayments';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<ChargeLineChargePayment[]> {
    return this.http
      .get<ChargeLineChargePayment[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all ChargeLine/ChargePayment')),
        catchError(this.handleError)
      );
  }

  fetchById(id_charge_line: string, id_charge_payment: string): Observable<ChargeLineChargePayment> {
    return this.http
      .get<ChargeLineChargePayment>(`${this.url}/${id_charge_line}/${id_charge_payment}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched ChargeLine/ChargePayment with id=${id_charge_line}/${id_charge_payment}`)),
        catchError(this.handleError)
      );
  }

  create(chargeLineChargePayment: ChargeLineChargePayment): Observable<ChargeLineChargePayment> {
    return this.http
      .post<ChargeLineChargePayment>(this.url, chargeLineChargePayment, { withCredentials: true })
      .pipe(
        tap((newChargeLineChargePayment) => console.log(`Created document id=${newChargeLineChargePayment.id_charge_line}`)),
        catchError(this.handleError)
      );
  }

  update(id_charge_line: string, id_charge_payment: string, chargeLineChargePayment: ChargeLineChargePayment): Observable<ChargeLineChargePayment> {
    return this.http
      .put<ChargeLineChargePayment>(`${this.url}/${id_charge_line}/${id_charge_payment}`, document, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated document id=${id_charge_line}/${id_charge_payment}`)),
        catchError(this.handleError)
      );
  }

  delete(id_charge_line: string, id_charge_payment: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id_charge_line}/${id_charge_payment}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted document id==${id_charge_line}/${id_charge_payment}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
