import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing-page-component',
  imports: [CommonModule],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss'
})
export class LandingPageComponent implements OnInit {
  constructor(
  ) {}

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


    /**
    this.authService.logout().subscribe({
      next: () => {      
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
      },
      error: err => {
        console.error('Logout failed:', err);
      }
    });

    this.personService.fetchAll().subscribe((persons: Person[]) => {
      for (const person of persons) {
        if (person.role_name === 'manager') {
          this.toEmails.push(person.email);
        }
      }
    });
    */
  }
  /** TO DO 
  sendMessage() {
    this.isSending = "true"; 
    const name = (document.getElementById("name") as HTMLInputElement).value;;
    const email = (document.getElementById("email") as HTMLInputElement).value;;
    const message = (document.getElementById("message") as HTMLTextAreaElement).value;;
  
    const contactMessage: ContactMessage = {
      subject: `Demande d'information depuis la page d'introduction de la part de ${name}`,
      message: message,
      fromEmail: email,
      toEmails: this.toEmails
    };
  
  
    this.contactService.create(contactMessage).subscribe({
      next: (res) => {
        console.log('Réponse reçue :', res);
        this.successMessage = 'Votre message a bien été envoyé.';
        this.errorMessage = '';
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


  sendMessage() {
    console.log("to be implemented");
    alert("to be implemented");
  }

  showAdmin(event: Event){
    event.preventDefault;
    this.finPart = false;
    this.comPart = false;
    if (this.adminPart) {
      this.adminPart = false;
    } else {
      this.adminPart = "true";
    }
  }


  showFin(event: Event){
    event.preventDefault;
    if (this.finPart) {
      this.finPart = false; 
    } else {
      this.finPart = "true";
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
      this.comPart = "true";
    }
    this.adminPart = false;
  }
 */
  
  sendMessage() {
    console.log("to be implemented");
    alert("to be implemented");
  }
  
  showAdmin() {
    const adminPart = document.getElementById("adminPart");
    const finPart = document.getElementById("finPart");
    const comPart = document.getElementById("comPart");
  
    adminPart?.setAttribute("hidden", "true");
    finPart?.setAttribute("hidden", "true");
    comPart?.setAttribute("hidden", "true");
  
    adminPart?.removeAttribute("hidden");
    adminPart?.scrollIntoView({ behavior: "smooth" });
  }
  
  showFin() {
    const adminPart = document.getElementById("adminPart");
    const finPart = document.getElementById("finPart");
    const comPart = document.getElementById("comPart");
  
    adminPart?.setAttribute("hidden", "true");
    finPart?.setAttribute("hidden", "true");
    comPart?.setAttribute("hidden", "true");
  
    finPart?.removeAttribute("hidden");
    finPart?.scrollIntoView({ behavior: "smooth" });
  }
  
  
  showCom() {
    const adminPart = document.getElementById("adminPart");
    const finPart = document.getElementById("finPart");
    const comPart = document.getElementById("comPart");
  
    adminPart?.setAttribute("hidden", "true");
    finPart?.setAttribute("hidden", "true");
    comPart?.setAttribute("hidden", "true");
  
    comPart?.removeAttribute("hidden");
    comPart?.scrollIntoView({ behavior: "smooth" });
  }
}
