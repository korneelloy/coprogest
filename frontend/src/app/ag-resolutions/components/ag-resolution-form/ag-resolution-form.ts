import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

import { BudgetCategory } from '../../../model/budgetcategory';
import { BudgetCategoryService } from '../../../services/budget-category/budget-category-service';

import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';

import { CallDate } from '../../../model/calldate';
import { CallDateService } from '../../../services/callDate/call-date-service';

import { formatDateForInput } from '../../../utils/formatDateForInput';
import { formatDateForOutput } from '../../../utils/formatDateForOutput';


@Component({
  selector: 'app-ag-resolution-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule ],
  templateUrl: './ag-resolution-form.html',
  styleUrl: './ag-resolution-form.scss'
})

export class AgResolutionForm implements OnInit {
  agResolutionForm: FormGroup;
  isEditMode= false;
  idAgResolution: string | null = null;
  budgetCategory: BudgetCategory[] = [];
  unitGroups: UnitGroup[] = [];
  callDates$!: Observable<CallDate[]>;
  

  id_unit_group: string = '';
  id_ag_notice: string = '';
  id_ag_minutes: string = '';

  formReady = false;

  budgetReadOnly: boolean = false;
  noDateError = false;

  nbOfNewDate: number = 0;

  formSubmitted = false;

  tableOfDates: string[] = []

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agResolutionService: AgResolutionService,
    private budgetCategoryService: BudgetCategoryService,
    private unitGroupService: UnitGroupService,
    private callDateService: CallDateService,
  ) {
    this.agResolutionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      resolution_text:  ['', [Validators.required]],
      required_majority:  ['', [Validators.required]],
      id_unit_group: ['', [Validators.required]],
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
    this.idAgResolution = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idAgResolution;

    this.agResolutionForm.get('budget')?.valueChanges.subscribe((value) => {
      this.updateBudgetValidators();
    });
    
    this.agResolutionForm.get('budget_type')?.valueChanges.subscribe((value) => {
      this.updateOpBudgetDatesValidators();
    });
    
    this.budgetCategoryService.fetchAll().subscribe((data: BudgetCategory[]) => {
      this.budgetCategory = data;
    });

    this.unitGroupService.fetchAllUnique().subscribe((datas: UnitGroup[]) => {
      this.unitGroups = datas;
      console.log("this.unitGroups", this.unitGroups);
    });

    this.agResolutionForm.get('required_majority')!.valueChanges.subscribe(value => {
      const budgetControl = this.agResolutionForm.get('budget');
  
      if (value === 'no_vote') {
        budgetControl!.setValue(0);
        this.budgetReadOnly = true;
      } else {
        this.budgetReadOnly = false;
      }
    });

    
    if (this.isEditMode) {
      this.agResolutionService.fetchById(this.idAgResolution!).subscribe((agResolutions: AgResolution[]) => {
        const agResolution = agResolutions[0];
      
        if (agResolution) {
          this.agResolutionForm.patchValue({
            title: agResolution.title,
            resolution_text: agResolution.resolution_text,
            required_majority: agResolution.required_majority,
            id_unit_group: agResolution.id_unit_group,
            budget: agResolution.budget,
            budget_amount: agResolution.budget_amount,
            budget_type: agResolution.budget_type,
            operating_budget_start: formatDateForInput(agResolution.operating_budget_start),
            operating_budget_end: formatDateForInput(agResolution.operating_budget_end),
            nb_of_instalments: agResolution.nb_of_instalments,
            budget_recup_tenant: agResolution.budget_recup_tenant,
            id_budget_category: agResolution.id_budget_category
          });
        }
        this.callDates$ = this.callDateService.fetchAllByAgResolution(this.idAgResolution!);

        this.updateBudgetValidators();
        this.updateOpBudgetDatesValidators();
        
        this.id_ag_notice = agResolution.id_ag_notice;
        this.id_ag_minutes = agResolution.id_ag_minutes;
        this.formReady = true;
    });
    } else {
      this.formReady = true;
      this.id_ag_notice = this.route.snapshot.paramMap.get('idagnotice') ?? '';
    }
  }  

  onSubmit(): void {
    if (this.agResolutionForm.invalid) return;

    const formValue = this.agResolutionForm.value;

    formValue.budget = Number(formValue.budget);
    formValue.nb_of_instalments = Number(formValue.nb_of_instalments);
    formValue.budget_recup_tenant = Number(formValue.budget_recup_tenant);

    formValue.id_ag_notice = this.id_ag_notice;
    formValue.id_ag_minutes = this.id_ag_minutes;

    formValue.operating_budget_start = formatDateForOutput(formValue.operating_budget_start);
    formValue.operating_budget_end = formatDateForOutput(formValue.operating_budget_end);

    Object.keys(formValue).forEach(key => {
      if (formValue[key] === '') {
        formValue[key] = null;
      }
    });


    if (this.isEditMode) {
      this.agResolutionService.update(this.idAgResolution!, formValue).subscribe(() => {
        this.router.navigate(['/agnotices', this.id_ag_notice], { queryParams: { updatedResolution: 'true' } })
        .then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
      
    } else {
      this.agResolutionService.create(formValue).subscribe((createdResolution: AgResolution) => {
        const newResolutionId = createdResolution.id;
        if (!newResolutionId) {
          console.error("Cannot get the Id of the created resolution");
          return;
        }
        const creations = this.tableOfDates.map(tableOfDate => {     
          const callDate: CallDate = {
            date_call: tableOfDate,
            id_ag_resolution: newResolutionId
          };
          return this.callDateService.create(callDate);
        });

        if (this.tableOfDates.length === 0) {
          this.router.navigate(['/agnotices', this.id_ag_notice, 'edit'], { queryParams: { createdResolution: 'true' } })
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
          return;
        }
            
        forkJoin(creations).subscribe(() => {
          this.router.navigate(['/agnotices', this.id_ag_notice, 'edit'], { queryParams: { createdResolution: 'true' } })
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        });
      });
    }
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

  private updateOpBudgetDatesValidators(): void {
    const budgetTypeValue = this.agResolutionForm.get('budget_type')?.value;
  
    const controlsToToggle = ['operating_budget_start', 'operating_budget_end'];
  
    if (budgetTypeValue === 'operating') {
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

  addDate(newDate: string) {
    const date = new Date(newDate);
    this.nbOfNewDate++;

    if (isNaN(date.getTime())) {
      console.warn("Date invalide");
      return;
    }
    
    
    if (this.isEditMode) {
      const newCallDate: CallDate = {
        date_call: date.toISOString(),
        id_ag_resolution: this.idAgResolution!,
      };  
      this.callDateService.create(newCallDate).subscribe({
        next: () => this.refreshCallDates(),
        error: (err) => console.error("Erreur lors de l'ajout de la date :", err),
      });
    } else {
      this.tableOfDates.push(date.toISOString());
    }
  
    
  }

  deleteDate(callDateId: string) {
    this.callDateService.delete(callDateId).subscribe({
      next: () => {
        this.nbOfNewDate--;
        this.refreshCallDates();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  }

  refreshCallDates() {
    this.callDates$ = this.callDateService.fetchAllByAgResolution(this.idAgResolution!);
  }
  

  submitForm() {
    this.formSubmitted = true;

    if (this.agResolutionForm.invalid) {
      this.agResolutionForm.markAllAsTouched();
      return;
    }

    const nbOfInstalments = this.agResolutionForm.get('nb_of_instalments')?.value;

    if (nbOfInstalments === 1 || nbOfInstalments === "1") {
      if (this.isEditMode) {
        this.callDates$.pipe(take(1)).subscribe(callDates => {
          if (!callDates || callDates.length === 0) {
            this.noDateError = true;
            return;
          } else {
            this.noDateError = false;
            this.onSubmit();
          }
        });
      } else {
        if (!this.nbOfNewDate || this.nbOfNewDate === 0) {
          this.noDateError = true;
          return;
        } else {
          this.noDateError = false;
          this.onSubmit();
        }
      }

    } else {
      this.noDateError = false;
      this.onSubmit();
    }
  }
  deleteDateinTable(i: number){
    this.tableOfDates.splice(i, 1);
  }
}
