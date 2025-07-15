import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person/person-service';

@Component({
  selector: 'app-person-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './person-detail.html',
  styleUrls: ['./person-detail.scss']
})
export class PersonDetail implements OnInit {
  person$!: Observable<Person>;
  updatedMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "Le copropriétaire a été mis à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      
      this.person$ = this.personService.fetchById(id);
    }    
  }

  change(id: string): void {
    this.router.navigate(['/persons', id, 'edit']);
  }

}
