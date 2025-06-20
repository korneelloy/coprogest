import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UnitUnitGroup } from '../../model/unitunitgroup';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UnitUnitGroupService {
  private url = environment.apiBaseUrl + 'unitunitgroups';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<UnitUnitGroup[]> {
    return this.http
      .get<UnitUnitGroup[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched unit-unit-groups')),
        catchError(this.handleError)
      );
  }

  fetchAllByUnit(id_unit: string): Observable<UnitUnitGroup[]> {
    return this.http
      .get<UnitUnitGroup[]>(`${this.url}/getByUnit/${id_unit}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched unit-unit-groups by unit')),
        catchError(this.handleError)
      );
  }

  fetchAllByGroup(id_unit_group: string): Observable<UnitUnitGroup[]> {
    return this.http
      .get<UnitUnitGroup[]>(`${this.url}/getByUnitGroup/${id_unit_group}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched unit-unit-groups by unit group')),
        catchError(this.handleError)
      );
  }
  fetchById(id_unit: string, id_unit_group: string): Observable<UnitUnitGroup> {
    return this.http
      .get<UnitUnitGroup>(`${this.url}/${id_unit}/${id_unit_group}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched unit-unit-group id=${id_unit + id_unit_group}`)),
        catchError(this.handleError)
      );
  }

  create(unitUnitGroup: UnitUnitGroup): Observable<UnitUnitGroup> {
    return this.http
      .post<UnitUnitGroup>(this.url, unitUnitGroup, { withCredentials: true })
      .pipe(
        tap((newUnitUnitGroup) => console.log(`Created unit-unit group id=${newUnitUnitGroup.id_unit + newUnitUnitGroup.id_unit_group}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, unitUnitGroup: UnitUnitGroup): Observable<UnitUnitGroup> {
    return this.http
      .put<UnitUnitGroup>(`${this.url}/${id}`, unitUnitGroup, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated unit-unit group id=${id}`)),
        catchError(this.handleError)
      );
  }

  deleteAllByUnit(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/deleteByUnit/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted all unit-unit group for unit id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted unit-unit group id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
