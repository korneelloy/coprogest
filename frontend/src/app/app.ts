import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SessionService } from './services/session/session-service';
import { Person } from '../app/model/person';
import { AuthService } from './services/auth/auth-service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit  {
  protected title = 'frontend';
  connectedUser: Person | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sessionService.loadUserFromServer().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.connectedUser = user;
      }
    });
    
    this.sessionService.user$.subscribe(user => {
      console.log("user$ updated:", user);
      this.connectedUser = user;
    });

    document.addEventListener
  }
    

  get isConnected(): boolean {
    return this.sessionService.isLoggedIn();
  }
 
  openMenu(){
    const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu?.classList.toggle('hidden');
  }

  openManagementMenu() {
    const mobileMenu = document.getElementById('mobile-management-menu');
      mobileMenu?.classList.toggle('hidden');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
  
    if (
      menu &&
      !menu.contains(event.target as Node) &&
      button &&
      !button.contains(event.target as Node)
    ) {
      menu.classList.add('hidden');
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Logout failed:', err);
      }
    });
  }
  
}  