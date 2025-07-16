import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

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
  
      const userId = this.connectedUser!.id;
      forkJoin({
        payments: this.chargePaymentService.fetchAllPerPerson(userId),
        calls: this.chargeCallService.fetchByPerson(userId)
      }).subscribe(({ payments, calls }) => {
        this.chargePayments = payments;
        this.chargeCallsByPerson = calls;
  
        this.accountBalance = 0;
        for (const payment of payments) {
          this.accountBalance += Number(payment.amount);
        }
        for (const call of calls) {
          this.accountBalance -= Number(call.total_amount);
        }
  
        this.combined = [
          ...calls.map(call => ({
            type: "charge_call",
            amount: call.total_amount,
            date: call.charge_call_date,
            description: null
          })),
          ...payments.map(payment => ({
            type: "charge_payment",
            amount: payment.amount,
            date: payment.charge_payment_date,
            description: payment.description
          }))
        ];
  
        this.combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    });
  }
}  