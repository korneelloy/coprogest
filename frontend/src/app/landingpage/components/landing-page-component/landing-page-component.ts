import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page-component',
  imports: [CommonModule],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss'
})
export class LandingPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  subject = '';
  message = '';

  successMessage = ''; 
  errorMessage = '';   

  adminPart: boolean = false;
  finPart: boolean = false;
  comPart: boolean = false;

  ngOnInit(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const theId = (e.srcElement as HTMLDivElement).id;
        console.log(theId);
        let target: HTMLElement | null = document.getElementById("features");
        if (theId) {
          if (theId === 'feat') {
            target = document.getElementById("features");
          } else if (theId === 'cont') {
            target = document.getElementById("contact");
          }
        }
        
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }); 
  }  

  
  sendMessage() {
    const data = { subject: this.subject, message: this.message };

    /**TO DO*/
    /** 
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
        */

  }

  showAdmin(event: Event){
    event.preventDefault;
    this.finPart = false;
    this.comPart = false;
    if (this.adminPart) {
      this.adminPart = false;
    } else {
      this.adminPart = true;
    }
  }


  showFin(event: Event){
    event.preventDefault;
    if (this.finPart) {
      this.finPart = false; 
    } else {
      this.finPart = true;
    }
    this.comPart = false;
    this.adminPart = false;
  }

  showCom(event: Event){
    event.preventDefault;
    this.finPart = false;
    if (this.comPart) {
      this.comPart = false;
    } else {
      this.comPart = true;
    }
    this.adminPart = false;
  }
}
