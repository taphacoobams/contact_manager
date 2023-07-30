import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        console.log(this.contacts);
      }
    );
  }

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.contacts = this.contacts.filter(item => item.id !== contactId);
        console.log('Contact supprimé avec succès!');
      }
    );
  }
}
