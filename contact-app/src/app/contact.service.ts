import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  [x: string]: any;
  private apiUrl = 'https://localhost:8080/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  viewContact(contactId: number): Observable<Contact> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.get<Contact>(url);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  editContact(contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/${contact.id}`;
    return this.http.put<Contact>(url, contact);
  }

  deleteContact(contactId: number): Observable<void> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.delete<void>(url);
  }
}