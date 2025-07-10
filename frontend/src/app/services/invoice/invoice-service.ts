import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Invoice } from '../../model/invoice';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private url = environment.apiBaseUrl + 'invoices';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Invoice[]> {
    return this.http
      .get<Invoice[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched invoices')),
        catchError(this.handleError)
      );
  }
  
  fetchByResolution(idAgResolution: string):  Observable<Invoice[]> {
    return this.http
      .get<Invoice[]>(`${this.url}/fetchbyresolution/${idAgResolution}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched invoices')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<Invoice> {
    return this.http
      .get<Invoice>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched invoice id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(invoice: Invoice): Observable<Invoice> {
    return this.http
      .post<Invoice>(this.url, invoice, { withCredentials: true })
      .pipe(
        tap((newDoc) => console.log(`Created invoice id=${newDoc.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, invoice: Invoice): Observable<Invoice> {
    return this.http
      .put<Invoice>(`${this.url}/${id}`, invoice, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated invoice id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted invoice id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
