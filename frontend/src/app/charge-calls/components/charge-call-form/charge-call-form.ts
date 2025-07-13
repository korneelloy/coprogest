import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';

import { ChargeLine } from '../../../model/chargeLine';
import { ChargeLineService } from '../../../services/chargeLine/charge-line-service';
import { forkJoin, switchMap } from 'rxjs';

import { formatDateForInput } from '../../../utils/formatDateForInput';


@Component({
  selector: 'app-charge-call-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './charge-call-form.html',
  styleUrl: './charge-call-form.scss'
})
export class ChargeCallForm implements OnInit {
  isEditMode = false;
  chargeCallId: string | null = null;
  chargeCall!: ChargeCall;

  chargeLinesNotCalledYet: ChargeLine[] = [];
  filteredChargeLines: ChargeLine[] = [];
  selectedChargeLineIds: Set<string> = new Set();
  filterText: string = '';
  today: string='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chargeCallService: ChargeCallService,
    private chargeLineService: ChargeLineService,
  ) {
  }

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; 
    this.chargeCallId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.chargeCallId;

    this.chargeLineService.fetchAllNotCalled().subscribe((chargeLinesNotCalledYet: ChargeLine[]) => {
      this.chargeLinesNotCalledYet = chargeLinesNotCalledYet;
      this.filteredChargeLines = chargeLinesNotCalledYet;
    })
  }

    /** TO DO TAKE OUT? */
    /** 
    if (this.isEditMode) {
      this.chargeCallService.fetchById(this.chargeCallId!).subscribe((data: ChargeCall) => {
        this.chargeCall = data;
      });
      this.chargeCallForm.patchValue({
        invoice_date: (new Date())
      });
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
   */

  toggleSelection(id: string): void {
    this.selectedChargeLineIds.has(id)
      ? this.selectedChargeLineIds.delete(id)
      : this.selectedChargeLineIds.add(id);
  }

  isSelected(id: string): boolean {
    return this.selectedChargeLineIds.has(id);
  }

  filterByPerson(): void {
    const text = this.filterText.toLowerCase();
    this.filteredChargeLines = this.chargeLinesNotCalledYet.filter(cl =>
      cl.person_first_name!.toLowerCase().includes(text) ||
      cl.person_last_name!.toLowerCase().includes(text) ||
      cl.person_email!.toLowerCase().includes(text)
    );
  }

  createChargeCall(): void {
    /** get the date */
    const date =(document.getElementById('date') as HTMLInputElement).value;

    console.log(date);

    /** get the selected lines and apply the filter to the information we got originally from the db */
    const selectedLines = this.chargeLinesNotCalledYet.filter(cl =>
      this.selectedChargeLineIds.has(cl.id!)
    );
  
    /** some error handling */
    if (selectedLines.length === 0) {
      console.log('Aucune ligne sélectionnée.');
      return;
    }
  
    /** group charge lines by person */
    const groupedByPerson = new Map<string, ChargeLine[]>();
  
    selectedLines.forEach(line => {
      const personId = line.unit_id_person;
      if (!groupedByPerson.has(personId!)) {
        groupedByPerson.set(personId!, []);
      }
      groupedByPerson.get(personId!)!.push(line);
    });
  
    /** for each person, prepare for the creation of a charge call  and in paralel....*/
    const perPersonRequests = Array.from(groupedByPerson.entries()).map(([personId, lines]) => {
      const payload: ChargeCall = { 
        id_person: personId, 
        charge_call_date: date
      };
      return this.chargeCallService.create(payload).pipe(
        switchMap((createdCall) => {
          /** ... update the chargeLines with the newly created charge call id */
          const updates = lines.map(line => {
            return this.chargeLineService.updateIdChargeCall(line.id!, createdCall.id!);
          });
          return forkJoin(updates);
        })
      );
    });
  
    /** ... execute all */
    forkJoin(perPersonRequests).subscribe({
      next: (results) => {
        console.log('Tous les appels de charge ont été créés avec succès.', results);
      },
      error: (err) => {
        console.error('Erreur lors de la création des appels de charge', err);
      }
    });
  }
}
