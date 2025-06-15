import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnitUnitGroup } from '../../../model/unitunitgroup';
import { UnitUnitGroupService } from '../../../services/unitunitgroup/unit-unit-group-service';
import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';

@Component({
  selector: 'app-unit-group-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './unit-group-form.html',
  styleUrls: ['./unit-group-form.scss']
})
export class UnitGroupForm implements OnInit {
  unitGroupForm: FormGroup;
  isEditMode = false;
  unitGroupId: string | null = null;

  unitGroups: UnitGroup[] = [];
  unitUnitGroups: UnitUnitGroup[] = [];
  selectedUnitGroupIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unitUnitGroupService: UnitUnitGroupService,
    private unitGroupService: UnitGroupService,
  ) {
    this.unitGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      special_shares: ['']
    });
  }

  ngOnInit(): void {
    this.unitGroupService.fetchAll().subscribe((data: UnitGroup[]) => {
      this.unitGroups = data;
    });
 
    this.unitGroupId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.unitGroupId;

    if (this.isEditMode) {
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
  changeMembers(unitGroupId: string) {
    this.router.navigate(['/unitunitgroups', unitGroupId, 'edit']);
  }
}
