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
  
  fetchByChargeCallId(chargeCallId: string): Observable<ChargeLine[]> {
      return this.http
        .get<ChargeLine[]>(`${this.url}/fetchbychargecallid/${chargeCallId}`, { withCredentials: true })
        .pipe(
          tap(() => console.log('Fetched charge lines')),
          catchError(this.handleError)
        );
    }

  fetchAllNotCalled(): Observable<ChargeLine[]> {
    return this.http
      .get<ChargeLine[]>(`${this.url}/fetchallnotcalled`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all charge lines not yet called')),
        catchError(this.handleError)
      );
  }

  fetchAllWithOpenAmounts(): Observable<ChargeLine[]> {
    return this.http
      .get<ChargeLine[]>(`${this.url}/fetchallwithopenamounts`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all charge lines that are not yet fully paid')),
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
        tap((newChargeLine) => console.log(`Created charge line id=${newChargeLine.id}`)),
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

  updateIdChargeCall(id: string, id_charge_call: string): Observable<ChargeLine> {
    return this.http
      .patch<ChargeLine>(
        `${this.url}/${id}`,
        { id_charge_call },
        { withCredentials: true }
      )
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
