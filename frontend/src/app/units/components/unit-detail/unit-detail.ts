import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';
import { UnitUnitGroup } from '../../../model/unitunitgroup';
import { UnitUnitGroupService } from '../../../services/unitunitgroup/unit-unit-group-service';


@Component({
  selector: 'app-unit-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './unit-detail.html',
  styleUrls: ['./unit-detail.scss']
})
export class UnitDetail implements OnInit {
  unit$!: Observable<Unit>;
  updatedMessage: string | null = null;
  unitUnitGroups: UnitUnitGroup[] = [];


  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService,
    private router: Router,
    private unitUnitGroupService: UnitUnitGroupService
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
      this.unitUnitGroupService.fetchAllByUnit(id).subscribe((data: UnitUnitGroup[]) => {
        this.unitUnitGroups = data;
    });
    }    
  }
  change(id: string): void {
    this.router.navigate(['/units', id, 'edit']);
  }
}
