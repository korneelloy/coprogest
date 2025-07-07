import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AgMinutesPresencePerson } from '../../model/agminutespresenceperson';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AgminutespresencepersonService {
  private url = environment.apiBaseUrl + 'agminutespresencepersons';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<AgMinutesPresencePerson[]> {
    return this.http
      .get<AgMinutesPresencePerson[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched presences')),
        catchError(this.handleError)
      );
  }

  fetchAllByMinutes(agMinutesId: string): Observable<AgMinutesPresencePerson[]> {
    return this.http
      .get<AgMinutesPresencePerson[]>(`${this.url}/getbyminutes/${agMinutesId}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched presences')),
        catchError(this.handleError)
      );
  }

  fetchById(id_ag_minutes: string, id_person: string): Observable<AgMinutesPresencePerson> {
    return this.http
      .get<AgMinutesPresencePerson>(`${this.url}/${id_ag_minutes}/${id_person}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched presence id=${id_ag_minutes}/${id_person}`)),
        catchError(this.handleError)
      );
  }

  create(agMinutesPresencePerson: AgMinutesPresencePerson): Observable<AgMinutesPresencePerson> {
    return this.http
      .post<AgMinutesPresencePerson>(this.url, agMinutesPresencePerson, { withCredentials: true })
      .pipe(
        tap((newAgMinutesPresencePerson) => console.log(`Created presence id=${newAgMinutesPresencePerson.id_ag_minutes}`)),
        catchError(this.handleError)
      );
  }

  update(id_ag_minutes: string, id_person: string, agMinutesPresencePerson: AgMinutesPresencePerson): Observable<AgMinutesPresencePerson> {
    return this.http
      .put<AgMinutesPresencePerson>(`${this.url}/${id_ag_minutes}/${id_person}`, agMinutesPresencePerson, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated presence id=${id_ag_minutes}/${id_person}`)),
        catchError(this.handleError)
      );
  }

  
  deleteAllByMinutes(id_ag_minutes: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/deletebyminutes/${id_ag_minutes}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted presence for minutes with id=${id_ag_minutes}}`)),
        catchError(this.handleError)
      );
  }

  delete(id_ag_minutes: string, id_person: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id_ag_minutes}/${id_person}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted presence id=${id_ag_minutes}/${id_person}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
