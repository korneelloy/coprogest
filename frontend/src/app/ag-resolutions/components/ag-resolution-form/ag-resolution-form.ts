import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

@Component({
  selector: 'app-ag-resolution-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ag-resolution-form.html',
  styleUrl: './ag-resolution-form.scss'
})
export class AgResolutionForm implements OnInit {
  agResolutionForm: FormGroup;
  isEditMode = false;
  agResolutionId: string | null = null;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agResolutionService: AgResolutionService
  ) {
    this.agResolutionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      resolution_text: ['', [Validators.required]], 
      required_majority: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      id_ag_minutes:[''],
      id_unit_group: ['', [Validators.required]],
      id_ag_notice:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.agResolutionId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agResolutionId;

    if (this.isEditMode) {
      this.agResolutionService.fetchById(this.agResolutionId!).subscribe((agResolution: AgResolution) => {
        this.agResolutionForm.patchValue({
          title: agResolution.title,
          resolution_text: agResolution.resolution_text, 
          required_majority: agResolution.required_majority,
          budget: agResolution.budget,
          id_ag_minutes: agResolution.id_ag_minutes, 
          id_unit_group: agResolution.id_unit_group, 
          id_ag_notice: agResolution.id_ag_notice
        });
      });
    }
  }

  onSubmit(): void {
    if (this.agResolutionForm.invalid) return;

    const formData = this.agResolutionForm.value;

    if (this.isEditMode) {
      this.agResolutionService.update(this.agResolutionId!, formData).subscribe(() => {
        this.router.navigate(['/agresolutions', this.agResolutionId], { queryParams: { updated: 'true' } });
      });
    } else {
      this.agResolutionService.create(formData).subscribe(() => {
        this.router.navigate(['/agresolutions'], { queryParams: { created: 'true' } });
      });
    }
  }
}
