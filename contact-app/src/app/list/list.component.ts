import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  contacts?: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des contacts:', error);
      }
    );
  }

  editContact(contactId: number) {
    // Logique pour la navigation vers la page de modification du contact avec l'ID contactId
  }

  deleteContact(contactId: number) {
    // Logique pour supprimer le contact avec l'ID contactId
  }

  viewContact(contactId: number) {
    // Logique pour la navigation vers la page de détails du contact avec l'ID contactId
  }
}


