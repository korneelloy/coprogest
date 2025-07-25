import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';

@Component({
  selector: 'app-unit-group-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unit-group-list.html',
  styleUrl: './unit-group-list.scss'
})
export class UnitGroupList implements OnInit{
  unitgroups$!: Observable<UnitGroup[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  constructor(
    private unitGroupService: UnitGroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le groupe a été créé avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      } else if (params.get('deleted') === 'true') {
        this.deletedMessage = 'Groupe supprimé avec succès.';
        setTimeout(() => this.deletedMessage = null, 5000);
      }
      this.unitgroups$ = this.unitGroupService.fetchAllUnique();
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/unitgroups', id]);  
  }

  editUnitGroup(id: string): void {
    this.router.navigate(['/unitgroups', id, 'edit']);  
  }
}
