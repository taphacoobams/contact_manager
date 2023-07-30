import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://127.0.0.1:5000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + '/contacts/')
    .pipe(
      catchError(this.errorHandler)
    );
  }


  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl + '/contacts/', JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  viewContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrl + '/contacts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  editContact(id: number,contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.apiUrl + '/contacts/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/contacts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}