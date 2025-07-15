import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SessionService } from '../../../services/session/session-service';
import { Person } from '../../../model/person';

import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';

import { ChargePayment } from '../../../model/chargepayment';
import { ChargePaymentService } from '../../../services/chargepayment/charge-payment-service';


@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './finance.html',
  styleUrl: './finance.scss'
})
export class Finance implements OnInit  {
  connectedUser: Person | null = null;
  chargeCallsByPerson: ChargeCall[] = []
  accountBalance: number = 0;

  chargePayments: ChargePayment[] = [];

  combined: { type: string; amount: string | number | undefined; date: string | Date; description: string | null}[] = [];

  
  constructor(
    private sessionService: SessionService,
    private chargeCallService: ChargeCallService,
    private chargePaymentService: ChargePaymentService,
  ) {}

  ngOnInit(): void {
    this.sessionService.user$.subscribe(user => {
      this.connectedUser = user;
      this.chargePaymentService.fetchAllPerPerson(this.connectedUser!.id).subscribe((chargePaymentsByPerson: ChargePayment[])=>{
        this.chargePayments = chargePaymentsByPerson
        for (const payment of chargePaymentsByPerson) {
          this.accountBalance =+ payment.amount;
        }
        this.chargeCallService.fetchByPerson(this.connectedUser!.id).subscribe((chargeCallsByPerson: any[]) => {
          this.chargeCallsByPerson = chargeCallsByPerson;
          for (const charge of chargeCallsByPerson) {
            this.accountBalance =- charge.total_amount;
          }
        });

      this.chargePaymentService.fetchAllPerPerson(this.connectedUser!.id).subscribe((chargePayments: ChargePayment[]) => {
        this.combined = [
          ...this.chargeCallsByPerson.map(call => ({
            type: "charge_call",
            amount: call.total_amount,
            date: call.charge_call_date,
            description: null
          })),
          ...chargePayments.map(payment => ({
            type: "charge_payment",
            amount: payment.amount,
            date: payment.charge_payment_date,
            description: payment.description
          }))
        ];
        this.combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());        
        })
      })
    });   
  }
}
