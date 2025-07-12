import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';

import { ContactService } from '../../../services/contact/contact-service';
import { ContactMessage } from '../../../model/contactmessage';

import { SessionService } from '../../../services/session/session-service';
import { PersonService } from '../../../services/person/person-service';

import { Person } from '../../../model/person';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})

export class ContactFormComponent implements OnInit  {
  contactForm: FormGroup;

  subject: string = '';
  message: string = '';

  successMessage: string = ''; 
  errorMessage: string = '';  

  fromEmail: string = "";
  toEmails: string[] = [];

  contactMessage: ContactMessage = {
    subject: '',
    message: '',
    fromEmail: '',
    toEmails: []
  };

  isSending: boolean = false;

  
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private sessionService: SessionService,
    private personService: PersonService,
   ) {
  
  this.contactForm = this.fb.group({
    subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });
  }

  ngOnInit(): void {
    this.sessionService.loadUserFromServer().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.fromEmail = user.email;
      }
      this.personService.fetchAll().subscribe((persons: Person[]) => {
        for (const person of persons) {
          if (person.role_name === 'manager') {
            this.toEmails.push(person.email);
          }
        }
      })
    });
  }

  sendMessage() {
    if (this.contactForm.invalid) return;

    this.isSending = true; 
  
    const formData: ContactMessage = {
      ...this.contactForm.value,
      fromEmail: this.fromEmail,
      toEmails: this.toEmails
    };
  
    this.contactService.create(formData).subscribe({
      next: (res) => {
        console.log('Réponse reçue :', res);
        this.successMessage = 'Votre message a bien été envoyé.';
        this.errorMessage = '';
        this.contactForm.reset();
      },
      error: (err) => {
        console.error("Erreur lors de l'envoi :", err);
        this.errorMessage = "Erreur lors de l'envoi du message.";
        this.successMessage = '';
      },
      complete: () => {
        this.isSending = false; 
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 5000);
    }});
  }
}
