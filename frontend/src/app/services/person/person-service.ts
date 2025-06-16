import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Person } from '../../model/person';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private url = environment.apiBaseUrl + 'persons';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.url)
      .pipe(
        tap(() => console.log('Fetched persons')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<Person> {
    return this.http
      .get<Person>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Fetched person id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(person: Person): Observable<Person> {
    return this.http
      .post<Person>(this.url, person)
      .pipe(
        tap((newPerson) => console.log(`Created person id=${newPerson.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, person: Person): Observable<Person> {
    return this.http
      .put<Person>(`${this.url}/${id}`, person)
      .pipe(
        tap(() => console.log(`Updated person id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Deleted person id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
