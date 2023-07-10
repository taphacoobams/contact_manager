import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contact!: Contact;

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    const contactId = +this.route.snapshot.paramMap.get('contactid')!;
    this.contactService['getContactById'](contactId).subscribe(
      (data: Contact) => {
        this.contact = data;
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la récupération des détails du contact:', error);
      }
    );
  }

  editContact() {
    this.contactService.editContact(this.contact).subscribe(
      () => {
        console.log('Contact mis à jour avec succès');
        this.router.navigate(['/contact', this.contact.id, 'view']);
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la mise à jour du contact:', error);
      }
    );
  }
}