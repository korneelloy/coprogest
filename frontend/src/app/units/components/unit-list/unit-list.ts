import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unit-list.html',
  styleUrl: './unit-list.scss'
})
export class UnitList implements OnInit{
  units$!: Observable<Unit[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le lot a été créé avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      this.units$ = this.unitService.fetchAll();
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/units', id]);  
  }  
}
