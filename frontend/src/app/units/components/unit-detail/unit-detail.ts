import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-unit-detail',
  imports: [CommonModule],
  templateUrl: './unit-detail.html',
  styleUrls: ['./unit-detail.scss']
})
export class UnitDetail implements OnInit {
  unit$!: Observable<Unit>;
  updatedMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "Le lot a été mis à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      
      this.unit$ = this.unitService.fetchById(id);
    }    
  }
  change(id: string): void {
    this.router.navigate(['/units', id, 'edit']);
  }
}
