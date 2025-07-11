import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChargeCall } from '../../../model/chargecall';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-charge-call-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './charge-call-form.html',
  styleUrl: './charge-call-form.scss'
})
export class ChargeCallForm implements OnInit {
  chargeCallForm: FormGroup;
  isEditMode = false;
  chargeCallId: string | null = null;
  chargeCalls: ChargeCall[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chargeCallService: ChargeCallService,
  ) {
    this.chargeCallForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.pattern(/^\d{1,13}(\.\d{1,2})?$/)]],
      invoice_date: ['', Validators.required],
      state:['', Validators.required],
      id_ag_resolution: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargeCallId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.chargeCallId;

    
    this.chargeCallService.fetchAll().subscribe((data: ChargeCall[]) => {
      this.chargeCalls = data;
    });



    if (this.isEditMode) {
      this.chargeCallForm.patchValue({
        invoice_date: (new Date())
        });
      }
    }


  onSubmit(): void {
    if (this.chargeCallForm.invalid) return;
  
    const formData = this.chargeCallForm.value;
      
    if (this.isEditMode) {
      this.chargeCallService.update(this.chargeCallId!, formData).subscribe(() => {
        this.router.navigate(['/units', this.chargeCallId], { queryParams: { updated: 'true' } });
      });
        
    } else {
      this.chargeCallService.create(formData).subscribe(() => {
        this.router.navigate(['/units'], { queryParams: { created: 'true' } });
      });
    }
  }
}
