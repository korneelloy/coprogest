import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AgResolutionPerson } from '../../model/agresolutionperson';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AgResolutionPersonService {
  private url = environment.apiBaseUrl + 'agresolutionpersons';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<AgResolutionPerson[]> {
    return this.http
      .get<AgResolutionPerson[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all votes')),
        catchError(this.handleError)
      );
  }

  fetchById(idAgResolution: string, idPerson: string): Observable<AgResolutionPerson> {
    return this.http
      .get<AgResolutionPerson>(`${this.url}/${idAgResolution}/${idPerson}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched vote id=${idAgResolution}/${idPerson}`)),
        catchError(this.handleError)
      );
  }

  fetchAllByAgResolution(idAgResolution: string): Observable<AgResolutionPerson[]> {
    return this.http
      .get<AgResolutionPerson[]>(`${this.url}/byagresolution/${idAgResolution}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched votes per resolution with id=${idAgResolution}`)),
        catchError(this.handleError)
      );
  }

  create(agResolutionPerson: AgResolutionPerson): Observable<AgResolutionPerson> {
    return this.http
      .post<AgResolutionPerson>(this.url, agResolutionPerson, { withCredentials: true })
      .pipe(
        tap((newAgResolutionPerson) => console.log(`Created vote for resolution with id=${newAgResolutionPerson.id_ag_resolution}`)),
        catchError(this.handleError)
      );
  }

  update(idAgResolution: string, idPerson: string, agResolutionPerson: AgResolutionPerson): Observable<AgResolutionPerson> {
    return this.http
      .put<AgResolutionPerson>(`${this.url}/${idAgResolution}/${idPerson}`, agResolutionPerson, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated vote for resolution with id${idAgResolution}`)),
        catchError(this.handleError)
      );
  }

  delete(idAgResolution: string, idPerson: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${idAgResolution}/${idPerson}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted vote for resolution with id=${idAgResolution}`)),
        catchError(this.handleError)
      );
  }

  deleteAllByAgResolution(idAgResolution: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/deleteallbyagresolution/${idAgResolution}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted all votes for resolution with id=${idAgResolution}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
