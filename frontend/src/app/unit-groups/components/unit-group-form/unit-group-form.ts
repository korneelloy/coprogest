import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';


import { UnitUnitGroup } from '../../../model/unitunitgroup';
import { UnitUnitGroupService } from '../../../services/unitunitgroup/unit-unit-group-service';
import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';
import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';


@Component({
  selector: 'app-unit-group-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule , CommonModule, RouterModule],
  templateUrl: './unit-group-form.html',
  styleUrls: ['./unit-group-form.scss']
})
export class UnitGroupForm implements OnInit {
  unitGroupForm: FormGroup;
  isEditMode = false;
  unitGroupId: string | null = null;

  unitGroups: UnitGroup[] = [];
  units: Unit[] = [];
  unitUnitGroups: UnitUnitGroup[] = [];
  selectedUnitGroupIds: string[] = [];

  selectedUnits: [string, number | undefined][] = [];
  selectedUnitsIdsOnly: string[] = [];

  updatedSelectedUnitIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unitUnitGroupService: UnitUnitGroupService,
    private unitGroupService: UnitGroupService,
    private unitService: UnitService
  ) {
    this.unitGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      special_shares: ['']
    });
  }

  ngOnInit(): void {
    this.unitService.fetchAll().subscribe((data: Unit[]) => {
      this.units = data;
    });

    this.unitGroupId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.unitGroupId;

    if (this.isEditMode) {
      /** create a list of all units inside the groupe */
      this.unitUnitGroupService.fetchAllByGroup(this.unitGroupId!).subscribe((unitUnitGroups: UnitUnitGroup[]) => {
        this.unitUnitGroups = unitUnitGroups;
        unitUnitGroups.forEach(unitUnitGroup => {
          this.selectedUnitsIdsOnly.push(unitUnitGroup.id_unit);
        });
      });
      /** fetch details of the group */
      this.unitGroupService.fetchById(this.unitGroupId!).subscribe((unitGroup: UnitGroup) => {
        this.unitGroupForm.patchValue({
          name: unitGroup.name,
          description: unitGroup.description,
          special_shares: unitGroup.special_shares
        })
      });
    }
    
  }

  onSubmit(): void {
    if (this.unitGroupForm.invalid) return;
  
    const formData = this.unitGroupForm.value;
    formData.special_shares = Number(this.unitGroupForm.value.special_shares)


    if (this.isEditMode) {
      this.unitGroupService.update(this.unitGroupId!, formData).subscribe(() => {
        /**call here unitunitgroup method delete all  */
        this.unitUnitGroupService.deleteAllByUnitGroup(this.unitGroupId!).subscribe(() => {
          /**  and then for each selected unit, create a unitunitgroup*/
          const creations = this.selectedUnitsIdsOnly.map(selectedUnitId => {
            /** first get the adjusted shares from the DOM */
            const inputElement = document.getElementById('adj_shares-' + selectedUnitId) as HTMLInputElement;
            const adjustedShares = inputElement ? Number(inputElement.value) : 0;
            /** create the unitunitgroup in memeory */
            const unitUnitGroup: UnitUnitGroup = {
              id_unit: selectedUnitId,
              id_unit_group: this.unitGroupId!,
              adjusted_shares: adjustedShares
            };
            /** call the create method */
            return this.unitUnitGroupService.create(unitUnitGroup);
          });
          // Await untill all unit unit groups are created
          forkJoin(creations).subscribe(() => {
            this.router.navigate(['/unitgroups', this.unitGroupId], { queryParams: { updated: 'true' } });
          });
        });
      });
    } else {
      this.unitGroupService.create(formData).subscribe((createdGroup: UnitGroup) => {
        const newGroupId = createdGroup.id;
        if (!newGroupId) {
          console.error("Impossible de récupérer l'ID du groupe créé.");
          return;
        }
    
        const creations = this.selectedUnitsIdsOnly.map(selectedUnitId => {
          const inputElement = document.getElementById('adj_shares-' + selectedUnitId) as HTMLInputElement;
          const adjustedShares = inputElement ? Number(inputElement.value) : 0;
    
          const unitUnitGroup: UnitUnitGroup = {
            id_unit: selectedUnitId,
            id_unit_group: newGroupId,
            adjusted_shares: adjustedShares
          };
          return this.unitUnitGroupService.create(unitUnitGroup);
        });
    
        forkJoin(creations).subscribe(() => {
          this.router.navigate(['/unitgroups', newGroupId], { queryParams: { created: 'true' } });
        });
      });
    }
  }    
  
  changeMembers(unitGroupId: string) {
    this.router.navigate(['/unitunitgroups', unitGroupId, 'edit']);
  }

  onCheckboxChange(unitId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      if (!this.selectedUnitsIdsOnly.includes(unitId)) {
        this.selectedUnitsIdsOnly.push(unitId);
      }
    } else {
      this.selectedUnitsIdsOnly = this.selectedUnitsIdsOnly.filter(id => id !== unitId);
    }
  }

  getShareValue(unitId: string): number {
    for (const unitUnitGroup of this.unitUnitGroups) {
      if (unitUnitGroup.id_unit === unitId) {
        return (unitUnitGroup.adjusted_shares!);
      }
    }
    return 0;
  }
}
