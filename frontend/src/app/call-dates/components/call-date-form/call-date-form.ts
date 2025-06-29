import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { firstValueFrom } from 'rxjs';


import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CallDateService } from '../../../services/callDate/call-date-service';
import { CallDate } from '../../../model/call_date';


@Component({
  selector: 'app-call-date-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './call-date-form.html',
  styleUrl: './call-date-form.scss'
})
export class CallDateForm implements OnInit, OnChanges {
  @Input() idAgResolution!: string | null;
  @Input() nbOfInstalments!: number;
  callDateForm!: FormGroup;
  isEditMode = false;
  infoInDb: CallDate[] = [];
  

  get callDates(): FormArray {
    return this.callDateForm.get('callDates') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private callDateService: CallDateService,
  ) { }

  ngOnInit(): void {
    this.callDateForm = this.fb.group({
      callDates: this.fb.array([])
    });

    this.callDateService.fetchAllByAgResolution(this.idAgResolution!).subscribe((data: CallDate[]) => {
      this.infoInDb = data || [];
      this.isEditMode = this.infoInDb.length > 0;

      console.log("infoInDb", this.infoInDb);
      
  
      if (this.isEditMode) {
        this.populateCallDateForms(this.infoInDb);
      } else {
        this.initCallDateForms();
      }
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nbOfInstalments']) {
      this.initCallDateForms();
    }
  }

  private initCallDateForms(): void {
    console.log("nbOfInstalments", this.nbOfInstalments);
    const callDatesArray = this.callDates;
    callDatesArray.clear();

    for (let i = 0; i < this.nbOfInstalments; i++) {
      this.callDates.push(this.fb.group({
        id_ag_resolution: [this.idAgResolution, Validators.required],
        id_call_date: ['', Validators.required],
        date_call: ['']
      }));
    }
  }

  private populateCallDateForms(existingCallDates: CallDate[]): void {
    const callDatesArray = this.callDates;
    callDatesArray.clear();
  
    existingCallDates.forEach(cd => {
      callDatesArray.push(this.fb.group({
        id_ag_resolution: [cd.id_ag_resolution, Validators.required],
        id_call_date: [cd.id, Validators.required],        
        date_call: [this.parseDateOrNull(cd.date_call)]

      }));
    });
  
    for (let i = existingCallDates.length; i < this.nbOfInstalments; i++) {
      callDatesArray.push(this.fb.group({
        id_ag_resolution: [this.idAgResolution, Validators.required],
        id_call_date: ['', Validators.required],
        date_call: ['']
      }));
    }
  }
  

  public async submit(): Promise<void> {
    try {
      // Step 1: Delete all existing entries
      await firstValueFrom(this.callDateService.deleteAllByAgResolution(this.idAgResolution!));
  
      const formArrayValues = this.callDates.value;
  
      for (const formData of formArrayValues) {
        formData.date_call = this.formatDateForInput(formData.date_call);
  
        // Step 2: Create call_date
        const createdCallDate = await firstValueFrom(
          this.callDateService.create({
            id_ag_resolution: formData.id_ag_resolution,
            date_call: formData.date_call
          } as CallDate
        ));  
      }
  
      // Step 4: Navigate away after all are created
      this.router.navigate(['/documentcategories'], { queryParams: { created: 'true' } });
  
    } catch (error) {
      console.error('Error in submission:', error);
      // Show error feedback to user
    }
  }
  

  private parseDateOrNull(dateInput: string | Date | undefined): string | null {
    if (!dateInput) return null;
  
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
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
}

