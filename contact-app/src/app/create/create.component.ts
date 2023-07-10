import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newContact: Contact = {
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: '',
    description: ''
  };

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit() {}

  createContact() {
    this.contactService.createContact(this.newContact).subscribe(
      () => {
        console.log('Contact créé avec succès');
        this.router.navigate(['/contact', this.newContact.id, 'view']);
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la création du contact:', error);
      }
    );
  }
}