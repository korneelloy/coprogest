import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})

export class ContactFormComponent {
  subject = '';
  message = '';

  successMessage = ''; // ✔️ à ajouter
  errorMessage = '';   // ✔️ à ajouter

  constructor(private http: HttpClient) {}

  sendMessage() {
    const data = { subject: this.subject, message: this.message };

    this.http.post('http://localhost:3000/api/contact', data, { responseType: 'text' }).subscribe({
      next: (res) => {
        console.log('Réponse reçue :', res);
        this.successMessage = res;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur lors de l’envoi :', err);
        this.errorMessage = 'Erreur lors de l’envoi du message.';
        this.successMessage = '';
      }
    });
  }
}

