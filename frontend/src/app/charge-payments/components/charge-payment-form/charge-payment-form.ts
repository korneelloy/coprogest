import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';



import { ChargePayment } from '../../../model/chargepayment';
import { ChargePaymentService } from '../../../services/chargepayment/charge-payment-service';

import { ChargeLine } from '../../../model/chargeLine';
import { ChargeLineService } from '../../../services/chargeLine/charge-line-service';

import { ChargeLineChargePayment } from '../../../model/chargelinechargepayment';
import { ChargeLineChargePaymentService } from '../../../services/chargelinechargepayment/charge-line-charge-payment-service';

import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person/person-service';

import { ChargeCallStatePipe } from '../../../label/chargeCallState/charge-call-state-pipe';


@Component({
  selector: 'app-charge-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule , CommonModule, RouterModule, ChargeCallStatePipe],
  templateUrl: './charge-payment-form.html',
  styleUrl: './charge-payment-form.scss'
})
export class ChargePaymentForm implements OnInit {

  chargePaymentForm: FormGroup;
  chargePaymentId: string | null = null;

  chargePayments: ChargePayment[] = [];
  chargeLines: ChargeLine[] = [];
  filteredLines: ChargeLine[] = [];
  chargeLineChargePayments: ChargeLineChargePayment[] = [];
  selectedChargeLineIds: string[] = [];

  selectedChargeLines: [string, number | undefined][] = [];
  selectedChargeLinesIdsOnly: string[] = [];

  updatedSelectedChargeLinesIds: string[] = [];

  persons$!: Observable<Person[]>;
  persons: Person[] = [];
  uniquePersons: Person[] = [];

  selectedPersonId: string = '';

  showForm: boolean = false;

  totalAmountToBeDivided: number = 0;

  partialPayment: number = 0;

  lastIdUnit: string = "";
  lastIdAgResolution: string = ""; 
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chargePaymentService: ChargePaymentService,
    private chargeLineService: ChargeLineService,
    private chargeLineChargePaymentService: ChargeLineChargePaymentService,
    private personService: PersonService,
  ) {
    this.chargePaymentForm = this.fb.group({
      amount: ['', [Validators.required]], 
      charge_payment_date: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    /** get all the chargelines */
    this.chargeLineService.fetchAllWithOpenAmounts().subscribe((chargeLines: ChargeLine[]) => {
      this.chargeLines = chargeLines;
      console.log("this.chargeLines", this.chargeLines);
    });

    this.chargePaymentId = this.route.snapshot.paramMap.get('id');

    /** everybody with at least one unit */
    this.persons$ = this.personService.getAllWithUnitInfo();

    /**list of unique persons */
    this.persons$.subscribe(data => {
      this.uniquePersons = data;
      this.uniquePersons = this.uniquePersons.filter(
        (person, index, self) =>
          index === self.findIndex(p => p.id === person.id)
      );
    });
  }

  /** show chargelines only for the chosen person */
  onPersonChange(personId: string) {    
    this.chargePaymentForm.reset();
    this.selectedChargeLinesIdsOnly = [];
    this.showForm = true;
    this.filteredLines = this.chargeLines.filter(
      line => line.person_id === personId
    );
    const el = document.getElementById('amount') as HTMLInputElement | null;
    if (el && el.value) {
      this.totalAmountToBeDivided = Number(el.value);
    } else {
      this.totalAmountToBeDivided = 0; 
    }
    const todayStr = new Date().toISOString().split('T')[0]; 
    this.chargePaymentForm.patchValue({ charge_payment_date: todayStr });

    /**TO DO What if person deosn't hve any open charge lines, how to create a negatif charge line? */
    /** if (this.filteredLines.length > 0) { */
      this.lastIdUnit = this.filteredLines[0].id_unit;
      this.lastIdAgResolution = this.filteredLines[0].id_ag_resolution;
    /**  *} else {
      this.lastIdUnit = null;
      this.lastIdAgResolution = null;
    }*/
  }
    

  onAmountChange(){
    Object.keys(this.chargePaymentForm.controls).forEach(controlName => {
      const control = this.chargePaymentForm.get(controlName);
      if (control && typeof control.value === 'boolean') {
        control.setValue(false);
      }
    });
    
    this.selectedChargeLinesIdsOnly = [];
    this.showForm = true;
   
    const el = document.getElementById('amount') as HTMLInputElement | null;
    if (el && el.value) {
      this.totalAmountToBeDivided = Number(el.value);
    } else {
      this.totalAmountToBeDivided = 0; 
    }    
  }


  
  onCheckboxChange(chargeLineId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      if (!this.selectedChargeLinesIdsOnly.includes(chargeLineId)) {
        this.selectedChargeLinesIdsOnly.push(chargeLineId);
      }

      /** TO DO HERE I NEED TAKE OUT THE OPEN AMOUNT, NOT THE ORIGINAL AMOUNT */
      const matchedLine = this.chargeLines.find(line => line.id === chargeLineId);
      const amount = Number(matchedLine ? matchedLine.open_amount : 0);
      this.totalAmountToBeDivided -= amount;
      if (this.totalAmountToBeDivided < 0) {
        this.partialPayment = this.totalAmountToBeDivided + amount;
      }
    } else {
      this.selectedChargeLinesIdsOnly = this.selectedChargeLinesIdsOnly.filter(id => id !== chargeLineId);
      const matchedLine = this.chargeLines.find(line => line.id === chargeLineId);
      const amount = Number(matchedLine ? matchedLine.amount : 0);
      this.totalAmountToBeDivided += amount;
    }
    const lastLine = this.filteredLines.find(line => line.id === chargeLineId);
    if (lastLine) {
      this.lastIdUnit = lastLine.id_unit;
      this.lastIdAgResolution = lastLine.id_ag_resolution;
    }

  }

  onSubmit(): void {
    if (this.chargePaymentForm.invalid) return;
  
    let formData: ChargePayment = this.chargePaymentForm.value;

    console.log(formData);

    formData.amount = Number(formData.amount);


      this.chargePaymentService.create(formData).subscribe((createdChargePayment: ChargePayment) => {
        const newPaymentId = createdChargePayment.id;
        if (!newPaymentId) {
          console.error("Impossible de récupérer l'ID du paiement créé.");
          return;
        }

        if (this.totalAmountToBeDivided >= 0) {
          const creations = this.selectedChargeLinesIdsOnly.map(selectedChargeLineId => {
            const chargeLineChargePayment: ChargeLineChargePayment = {
              id_charge_line: selectedChargeLineId,
              id_charge_payment: newPaymentId,
              partial_payment: null
            };
            return this.chargeLineChargePaymentService.create(chargeLineChargePayment);
          });
          forkJoin(creations).subscribe(() => {
            /**TO DO TO FINSIH */
            /**
            if (this.totalAmountToBeDivided > 0) {
              const negatifChargeLine: ChargeLine = {
                amount: -(this.totalAmountToBeDivided),
                call_date: new Date,
                state: "to_be_sent",
                id_unit: "string",
                id_ag_resolution: "string"
              }
              this.chargeLineService.create

            }
               */
            this.router.navigate(['/chargepayments'], { queryParams: { created: 'true' } });
          });

        } else {
          const creations = this.selectedChargeLinesIdsOnly.map((selectedChargeLineId, index, array) => {
            const isLast = index === array.length - 1;
          
            const chargeLineChargePayment: ChargeLineChargePayment = {
              id_charge_line: selectedChargeLineId,
              id_charge_payment: newPaymentId,
              partial_payment: isLast ? this.partialPayment : null
            };
          
            return this.chargeLineChargePaymentService.create(chargeLineChargePayment);
          });
          
          forkJoin(creations).subscribe(() => {
            this.router.navigate(['/chargepayments'], { queryParams: { created: 'true' } });
          });
        }





      });
      
    }
  
}
