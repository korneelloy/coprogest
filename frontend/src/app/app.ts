import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SessionService } from './services/session/session-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'frontend';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.sessionService.loadUserFromServer().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    
    const mobile_menu_button = document.getElementById('mobile-menu-button');
    mobile_menu_button?.addEventListener('click', function (this: HTMLElement) {
      const mobileMenu = document.getElementById('mobile-menu');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu?.classList.toggle('hidden');
    });
    const mobile_dropdown_triggers = document.querySelectorAll('.mobile-dropdown-trigger');
    mobile_dropdown_triggers.forEach(trigger => {
      trigger.addEventListener('click', function (this: HTMLElement) {
        const content = this.nextElementSibling;
        content?.classList.toggle('hidden');
      });
    });
  }
}
