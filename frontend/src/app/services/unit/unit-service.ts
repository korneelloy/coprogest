import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Unit } from '../../model/unit';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private url = environment.apiBaseUrl + 'units';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Unit[]> {
    return this.http
      .get<Unit[]>(this.url)
      .pipe(
        tap(() => console.log('Fetched units')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<Unit> {
    return this.http
      .get<Unit>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Fetched unit id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(unit: Unit): Observable<Unit> {
    return this.http
      .post<Unit>(this.url, unit)
      .pipe(
        tap((newDoc) => console.log(`Created unit id=${newDoc.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, unit: Unit): Observable<Unit> {
    return this.http
      .put<Unit>(`${this.url}/${id}`, unit)
      .pipe(
        tap(() => console.log(`Updated unit id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Deleted unit id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
