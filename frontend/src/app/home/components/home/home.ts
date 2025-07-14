import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SessionService } from '../../../services/session/session-service';
import { Person } from '../../../model/person';

import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';

import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit  {
  connectedUser: Person | null = null;
  units: Unit[] = [];
  userUnits:Unit[] = [];

  chargeCallsByPerson: ChargeCall[] = []


  accountBalance: number = 0;


  constructor(
    private sessionService: SessionService,
    private unitService: UnitService,
    private chargeCallService: ChargeCallService,
  ) {}

  ngOnInit(): void {
    this.sessionService.user$.subscribe(user => {
      this.connectedUser = user;
      this.unitService.fetchAll().subscribe((units: Unit[]) =>{
        this.units = units;
        this.userUnits = this.units.filter(unit => unit.id_person === this.connectedUser!.id);  
      });
      this.chargeCallService.fetchByPerson(this.connectedUser!.id).subscribe((chargeCallsByPerson: ChargeCall[])=>{
        this.chargeCallsByPerson = chargeCallsByPerson;
        const totalCharged = this.chargeCallsByPerson.reduce((sum, call) => {
          return sum + Number(call.total_charged ?? '0')
        }, 0);
        const totalPaid = this.chargeCallsByPerson.reduce((sum, call) => {
          return sum + Number(call.total_paid ?? '0')
        }, 0);
        this.accountBalance = totalPaid - totalCharged;
        if (this.accountBalance < 0) {
         
        }

      })
    });   
  }
}



/** 

export class Home implements OnInit {
  accountBalance: number = 1245;
  connectedUser = {
    first_name: 'Saïd',
    last_name: 'Laamri',
    email: 'slaamri@yahoo.fr',
    telephone: '06 12 34 56 78',
    street: '12 rue de la République',
    postal_code: '75001',
    city: 'Paris'
  };
  userUnits = [
    { designation: 'Lot 3B', floor: '2e étage', tantiemes: 120 },
    { designation: 'Lot 5C', floor: '4e étage', tantiemes: 95 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    // Tu pourras ici remplacer les valeurs ci-dessus par des appels HTTP vers ton backend plus tard
  }
  */

