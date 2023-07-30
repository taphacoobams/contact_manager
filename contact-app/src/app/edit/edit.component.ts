import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  form!: FormGroup;
  contact!: Contact;

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['contactId'];
    this.contactService.viewContact(this.id).subscribe((data: Contact)=>{
      this.contact = data;
    });
    
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.contactService.editContact(this.id, this.form.value).subscribe(res => {
         console.log('Contact modifié avec succès!');
         this.router.navigateByUrl('/list');
    })
  }
   
}