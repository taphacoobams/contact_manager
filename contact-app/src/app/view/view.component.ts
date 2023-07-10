import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  contact!: Contact;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    const contactId = +this.route.snapshot.paramMap.get('contactid')!;
    this.contactService.viewContact(contactId).subscribe(
      (data: Contact) => {
        this.contact = data;
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la récupération des détails du contact:', error);
      }
    );
  }
}