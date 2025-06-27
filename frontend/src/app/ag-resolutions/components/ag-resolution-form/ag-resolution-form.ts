import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

import { BudgetCategory } from '../../../model/budgetcategory';
import { BudgetCategoryService } from '../../../services/budget-category/budget-category-service';



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
  installmentOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  budgetCategory: BudgetCategory[] = [];
  id_unit_group: string = '';
  id_ag_notice: string = '';
  id_ag_minutes: string = '';

  formReady = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agResolutionService: AgResolutionService,
    private budgetCategoryService: BudgetCategoryService,
  ) {
    this.agResolutionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      resolution_text:  ['', [Validators.required]],
      required_majority:  ['', [Validators.required]],
      budget:  ['', [Validators.required]],  // Oui/Non budget lié
      operating_budget_start: [''],
      operating_budget_end: [''],
      nb_of_instalments: [''],
      budget_recup_tenant: [''],
      budget_type: [''],
      id_budget_category: [''],
      budget_amount: ['']
      
    });
  }

  ngOnInit(): void {
    this.agResolutionId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agResolutionId;

    this.agResolutionForm.get('budget')?.valueChanges.subscribe((value) => {
      this.updateBudgetValidators();
    });

    this.budgetCategoryService.fetchAll().subscribe((data: BudgetCategory[]) => {
      this.budgetCategory = data;
    });
    

    if (this.isEditMode) {
      this.agResolutionService.fetchById(this.agResolutionId!).subscribe((agResolution: AgResolution) => {
        this.agResolutionForm.patchValue({
          title: agResolution.title,
          resolution_text: agResolution.resolution_text,
          required_majority: agResolution.required_majority,
          budget: agResolution.budget,
          budget_amount: agResolution.budget_amount,
          budget_type: agResolution.budget_type,
          operating_budget_start: this.formatDateForInput(agResolution.operating_budget_start),
          operating_budget_end: this.formatDateForInput(agResolution.operating_budget_end),
          nb_of_instalments: agResolution.nb_of_instalments,
          budget_recup_tenant: agResolution.budget_recup_tenant,
          id_budget_category: agResolution.id_budget_category
        });

        this.updateBudgetValidators();
        
        this.id_unit_group = agResolution.id_unit_group;
        this.id_ag_notice = agResolution.id_ag_notice;
        this.id_ag_minutes = agResolution.id_ag_minutes;
        this.formReady = true;
    });
    } else {
      this.formReady = true;
    }
  }  

  onSubmit(): void {
    if (this.agResolutionForm.invalid) return;
  
    const formValue = this.agResolutionForm.value;

    formValue.budget = Number(formValue.budget);
    formValue.nb_of_instalments = Number(formValue.nb_of_instalments);
    formValue.budget_recup_tenant = Number(formValue.budget_recup_tenant);

    formValue.id_unit_group = this.id_unit_group;
    formValue.id_ag_notice = this.id_ag_notice;
    formValue.id_ag_minutes = this.id_ag_minutes;


    if (this.isEditMode) {
      this.agResolutionService.update(this.agResolutionId!, formValue).subscribe(() => {
        this.router.navigate(['/agresolutions', this.agResolutionId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      this.agResolutionService.create(formValue).subscribe(() => {
        this.router.navigate(['/agresolutions'], { queryParams: { created: 'true' } });
      });
    }
  }

  private formatDateForInput(date: string | Date): string {
    if (!date) return '';
  
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      // déjà au bon format
      return date;
    }
  
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private updateBudgetValidators(): void {
    const budgetValue = this.agResolutionForm.get('budget')?.value;
  
    const controlsToToggle = ['budget_amount', 'budget_type', 'nb_of_instalments', 'id_budget_category'];
  
    if (budgetValue === '1' || budgetValue === 1 || budgetValue === 'oui') {
      controlsToToggle.forEach(field => {
        this.agResolutionForm.get(field)?.setValidators([Validators.required]);
        this.agResolutionForm.get(field)?.updateValueAndValidity();
      });
    } else {
      controlsToToggle.forEach(field => {
        this.agResolutionForm.get(field)?.clearValidators();
        this.agResolutionForm.get(field)?.updateValueAndValidity();
      });
    }
  }
  
}
