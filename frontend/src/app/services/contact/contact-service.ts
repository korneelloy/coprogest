import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ContactMessage } from '../../model/contactmessage';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = environment.apiBaseUrl + 'contact/new';

  constructor(private http: HttpClient) {}

   
  create(contactMessage: ContactMessage): Observable<ContactMessage> {
    return this.http
      .post<ContactMessage>(this.url, contactMessage, { withCredentials: true })
      .pipe(
        tap((newcontactMessage) => console.log(`Message send`)),
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}



