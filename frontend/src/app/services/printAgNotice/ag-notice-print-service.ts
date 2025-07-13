import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgNoticePrintService {
  private url = environment.apiBaseUrl + 'agnotices/generateconvocations';

  constructor(private http: HttpClient) {}

  downloadConvocation(agNoticeId: string): Observable<Blob> {
    return this.http
      .get(`${this.url}/${agNoticeId}`, { 
        responseType: 'blob', 
        withCredentials: true 
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
