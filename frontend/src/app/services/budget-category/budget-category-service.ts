import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BudgetCategory } from '../../model/budgetcategory';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryService {
  private url = environment.apiBaseUrl + 'budgetcategories';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<BudgetCategory[]> {
    return this.http
      .get<BudgetCategory[]>(this.url, { withCredentials: true })
      .pipe(
        tap(() => console.log('Fetched budget categories')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<BudgetCategory> {
    return this.http
      .get<BudgetCategory>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Fetched budget category id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(budgetCategory: BudgetCategory): Observable<BudgetCategory> {
    return this.http
      .post<BudgetCategory>(this.url, budgetCategory, { withCredentials: true })
      .pipe(
        tap((newBudgetCategory) => console.log(`Created budget category id=${newBudgetCategory.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, budgetCategory: BudgetCategory): Observable<BudgetCategory> {
    return this.http
      .put<BudgetCategory>(`${this.url}/${id}`, budgetCategory, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Updated budget category id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(`Deleted budget category id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
