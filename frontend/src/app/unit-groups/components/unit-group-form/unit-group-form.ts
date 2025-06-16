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
  selectedUnitIds: [string, Number | undefined][] = [];
  selectedIdsOnly: string[] = [];
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
    /** 
    this.unitGroupService.fetchAll().subscribe((data: UnitGroup[]) => {
      this.unitGroups = data;
      console.log(this.unitGroups);
    });
    */

    this.unitService.fetchAll().subscribe((data: Unit[]) => {
      this.units = data.map(unit => ({
        ...unit,
        selected: this.selectedUnitIds.some(([id, _]) => id === unit.id)
      }));
      this.selectedIdsOnly = this.selectedUnitIds.map(([id, _]) => id);
    });    
    
    this.unitGroupId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.unitGroupId;

    if (this.isEditMode) {
      this.unitUnitGroupService.fetchAllByGroup(this.unitGroupId!).subscribe((unitUnitGroups: UnitUnitGroup[]) => {
        unitUnitGroups.forEach(unitUnitGroup => {
          this.selectedUnitIds.push([unitUnitGroup.id_unit, unitUnitGroup.adjusted_shares]);
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
  
    formData.special_shares = formData.special_shares === 0 ? false : true;
  
    console.log('Form data:', formData);
    console.log('Selected units:', this.selectedUnitIds);
    formData.selectedUnitIds = this.selectedUnitIds;
    
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
    
    console.log(checkedUnits); // e.g., ['2', '3']
    
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
      if (!this.selectedUnitIds.some(([id, _]) => id === unitId)) {
        this.selectedUnitIds.push([unitId, 0]); 
      }
    } else {
      this.selectedUnitIds = this.selectedUnitIds.filter(([id, _]) => id !== unitId);
    }
  }
  
  
}
