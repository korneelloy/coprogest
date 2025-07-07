import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person/person-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss'
})
export class PersonList implements OnInit{
  persons$!: Observable<Person[]>;
  createdMessage: string | null = null;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le copropriétaire a été créé avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      this.persons$ = this.personService.fetchAll();

    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/persons', id]);  
  }

  editPerson(id: string): void {
    this.router.navigate(['/persons', id, 'edit']);  
  }
}