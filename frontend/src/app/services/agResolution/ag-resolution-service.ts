import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AgResolution } from '../../model/agresolution';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AgResolutionService {
  private url = environment.apiBaseUrl + 'agresolutions';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag resolutions')),
        catchError(this.handleError)
      );
  }

  fetchAllWithActifBudget(): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(`${this.url}/fetchallwithactifbudget`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched all ag resolutions with actif budget')),
        catchError(this.handleError)
      );
  }

  fetchAllByAgNotice(id_ag_notice: string): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(`${this.url}/getbyagnotice/${id_ag_notice}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag resolutions by ag notice')),
        catchError(this.handleError)
      );
  }

  fetchAllByAgMinutes(id_ag_minutes: string): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(`${this.url}/getbyagminutes/${id_ag_minutes}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag resolutions by ag minutes')),
        catchError(this.handleError)
      );
  }


  fetchAllNoticesWithoutMinutes(): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(`${this.url}/fetchAllNoticesWithoutMinutes/`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched ag notices without ag minutes')),
        catchError(this.handleError)
      );
  }

  

  fetchById(id: string): Observable<AgResolution[]> {
    return this.http
      .get<AgResolution[]>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched ag resolution id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(agResolution: AgResolution): Observable<AgResolution> {
    return this.http
      .post<AgResolution>(this.url, agResolution, { withCredentials: true })
      .pipe(
        tap((newAgResolution) => console.log(`Created ag resolution id=${newAgResolution.id}`)),
        catchError(this.handleError)
      );
  }


  update(id: string, agResolution: AgResolution): Observable<AgResolution> {
    return this.http
      .put<AgResolution>(`${this.url}/${id}`, agResolution, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated ag resolution id=${id}`)),
        catchError(this.handleError)
      );
  }

  updateMinutesLink(id: string, id_ag_minutes: string): Observable<AgResolution> {
    return this.http
      .patch<AgResolution>(`${this.url}/agmin/${id}`, {id_ag_minutes : id_ag_minutes}, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated ag resolution id=${id}`)),
        catchError(this.handleError)
      );
  }

  updateStatus(id: string, status: string, budgetActifStatus: number): Observable<AgResolution> {
    return this.http
      .patch<AgResolution>(`${this.url}/status/${id}/${status}/${budgetActifStatus}`, {}, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated ag resolution id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted ag resolution id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
