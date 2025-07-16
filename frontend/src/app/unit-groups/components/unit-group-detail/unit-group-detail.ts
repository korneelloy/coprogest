import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';

import { UnitUnitGroup } from '../../../model/unitunitgroup';
import { UnitUnitGroupService } from '../../../services/unitunitgroup/unit-unit-group-service';



@Component({
  selector: 'app-unit-group-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './unit-group-detail.html',
  styleUrls: ['./unit-group-detail.scss']
})
export class UnitGroupDetail implements OnInit {
  unitGroup$!: Observable<UnitGroup>;
  updatedMessage: string | null = null;
  unitUnitGroups: UnitUnitGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private unitGroupService: UnitGroupService,
    private router: Router,
    private unitUnitGroupService: UnitUnitGroupService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "Le groupe a été mis à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      
      this.unitGroup$ = this.unitGroupService.fetchById(id);
      this.unitUnitGroupService.fetchAllByGroup(id).subscribe((data: UnitUnitGroup[]) => {
        this.unitUnitGroups = data;
      });
    }    
  }

  deletion(id: string): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Attention, action irréversible !");
    
    if (confirmed) {
      this.unitGroupService.delete(id).subscribe(() => {
        this.router.navigate(['/unitgroups'], { queryParams: { deleted: 'true' } });
      });
    }
  }

  change(id: string): void {
    this.router.navigate(['/unitgroups', id, 'edit']);
  }

}

