import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SessionService } from '../../../services/session/session-service';
import { Person } from '../../../model/person';

import { Unit } from '../../../model/unit';
import { UnitService } from '../../../services/unit/unit-service';

import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';

import { ChargePayment } from '../../../model/chargepayment';
import { ChargePaymentService } from '../../../services/chargepayment/charge-payment-service';


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

  accountBalance: number = 0;

  payment: number = 0;
  charge : number = 0;

  constructor(
    private sessionService: SessionService,
    private unitService: UnitService,
    private chargeCallService: ChargeCallService,
    private chargePaymentService: ChargePaymentService,
  ) {}

  ngOnInit(): void {
    this.sessionService.user$.subscribe(user => {
      this.connectedUser = user;
      this.unitService.fetchAll().subscribe((units: Unit[]) =>{
        this.units = units;
        this.userUnits = this.units.filter(unit => unit.id_person === this.connectedUser!.id);  
      });
      this.chargePaymentService.fetchAllPerPerson(this.connectedUser!.id).subscribe((chargePaymentsByPerson: ChargePayment[])=>{
        for (const payment of chargePaymentsByPerson) {
          this.accountBalance =+ payment.amount;
        }
        this.chargeCallService.fetchByPerson(this.connectedUser!.id).subscribe((chargeCallsByPerson: any[]) => {
          for (const charge of chargeCallsByPerson) {
            this.accountBalance =- charge.total_amount;
          }
        });
      });
    });   
  }
}
