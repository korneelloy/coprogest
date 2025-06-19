import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  selectedUnits: [string, Number | undefined][] = [];
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

    this.unitUnitGroupService.fetchAll().subscribe((data: UnitUnitGroup[]) => {
      this.unitUnitGroups = data;
      for (const unitUnitGroup of this.unitUnitGroups) {
        document.getElementById('adj_shares-'+unitUnitGroup.id_unit)?.setAttribute("value", "eeee" );
      }  
    });


    this.unitGroupId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.unitGroupId;

    if (this.isEditMode) {
      this.unitUnitGroupService.fetchAllByGroup(this.unitGroupId!).subscribe((unitUnitGroups: UnitUnitGroup[]) => {
        unitUnitGroups.forEach(unitUnitGroup => {
          this.selectedUnitsIdsOnly.push(unitUnitGroup.id_unit);
        });
      });
      this.unitGroupService.fetchById(this.unitGroupId!).subscribe((unitGroup: UnitGroup) => {
        this.unitGroupForm.patchValue({
          name: unitGroup.name,
          description: unitGroup.description,
          special_shares: unitGroup.special_shares
        });
      });
    }
  }


  onSubmit(): void {
    if (this.unitGroupForm.invalid) return;
  
    const formData = this.unitGroupForm.value;
    
    if (formData.special_shares === 'false') {
      formData.special_shares = false;
    } else {
      formData.special_shares = true;
    }
    
    this.selectedUnits = [];

    for (const selectedUnitsId of this.selectedUnitsIdsOnly) {
      const currentid = "adj_shares-"+selectedUnitsId;
      const el = document.getElementById(currentid) as HTMLInputElement;
      const value = el?.value;
      this.selectedUnits.push([selectedUnitsId, Number(value)]);
    }

    formData.selectedUnits = this.selectedUnits;
    
    if (this.isEditMode) {
      this.unitGroupService.update(this.unitGroupId!, formData).subscribe(() => {
        this.router.navigate(['/unitgroups', this.unitGroupId], { queryParams: { updated: 'true' } });
      });
    } else {
      this.unitGroupService.create(formData).subscribe(() => {
        this.router.navigate(['/unitgroups'], { queryParams: { created: 'true' } });
      });
    }
  }


/**  
  onSubmit(): void {

    const units = document.getElementsByClassName('units');
    const checkedUnits = [];
    
    for (let i = 0; i < units.length; i++) {
      if (units[i].checked) {
        checkedUnits.push(units[i].value);
      }
    }
    
    console.log(checkedUnits);
    
    if (this.unitGroupForm.invalid) return;

    const formData = this.unitGroupForm.value;

    if(formData.special_shares === 0) {
      formData.special_shares = false;
    } else {
      formData.special_shares = true;
    }
    console.log(formData);
    
    if (this.isEditMode) {
      this.unitGroupService.update(this.unitGroupId!, formData).subscribe(() => {
        this.router.navigate(['/unitgroups', this.unitGroupId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      this.unitGroupService.create(formData).subscribe(() => {
        this.router.navigate(['/unitgroups'], { queryParams: { created: 'true' } });
      });
    }
  }

   */

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

  getShareValue(unitId: string): string {
    for (const unitUnitGroup of this.unitUnitGroups) {
      if (unitUnitGroup.id_unit === unitId) {
        return String(unitUnitGroup.adjusted_shares);
      }
    }
    return "0";
  }
}
