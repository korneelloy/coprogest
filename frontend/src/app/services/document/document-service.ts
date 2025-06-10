import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Document } from '../../model/document';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private url = environment.apiBaseUrl + 'documents';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Document[]> {
    return this.http
      .get<Document[]>(this.url)
      .pipe(
        tap(() => console.log('Fetched documents')),
        catchError(this.handleError)
      );
  }

  fetchById(id: string): Observable<Document> {
    return this.http
      .get<Document>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Fetched document id=${id}`)),
        catchError(this.handleError)
      );
  }

  create(document: Document): Observable<Document> {
    return this.http
      .post<Document>(this.url, document)
      .pipe(
        tap((newDoc) => console.log(`Created document id=${newDoc.id}`)),
        catchError(this.handleError)
      );
  }

  update(id: string, document: Document): Observable<Document> {
    return this.http
      .put<Document>(`${this.url}/${id}`, document)
      .pipe(
        tap(() => console.log(`Updated document id=${id}`)),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
      .pipe(
        tap(() => console.log(`Deleted document id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
