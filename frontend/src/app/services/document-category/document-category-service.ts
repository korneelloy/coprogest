import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { DocumentCategory } from '../../model/documentcategory';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DocumentCategoryService {
  private url = environment.apiBaseUrl + 'documentcategories';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<DocumentCategory[]> {
    return this.http
      .get<DocumentCategory[]>(this.url)
      .pipe(
        tap(() => console.log('Fetched document categories')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<DocumentCategory> {
    return this.http
      .get<DocumentCategory>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Fetched document category id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(documentCategory: DocumentCategory): Observable<DocumentCategory> {
    return this.http
      .post<DocumentCategory>(this.url, documentCategory)
      .pipe(
        tap((newDocCat) => console.log(`Created document category id=${newDocCat.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, documentCategory: DocumentCategory): Observable<DocumentCategory> {
    return this.http
      .put<DocumentCategory>(`${this.url}/${id}`, documentCategory)
      .pipe(
        tap(() => console.log(`Updated document category id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Deleted document category id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
