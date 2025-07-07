import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UnitGroup } from '../../model/unitgroup';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UnitGroupService {
  private url = environment.apiBaseUrl + 'unitgroups';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<UnitGroup[]> {
    return this.http
      .get<UnitGroup[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched unit-groups')),
        catchError(this.handleError)
      );
  }

  fetchAllUnique(): Observable<UnitGroup[]> {
    return this.http
      .get<UnitGroup[]>(`${this.url}/allunique`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched unit-groups')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<UnitGroup> {
    return this.http
      .get<UnitGroup>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched unit-group id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(unitgroup: UnitGroup): Observable<UnitGroup> {
    return this.http
      .post<UnitGroup>(this.url, unitgroup, { withCredentials: true })
      .pipe(
        tap((newUnitGroup) => console.log(`Created unit-group id=${newUnitGroup.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, unitgroup: UnitGroup): Observable<UnitGroup> {
    return this.http
      .put<UnitGroup>(`${this.url}/${id}`, unitgroup, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated unit-group id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted unit-group id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
