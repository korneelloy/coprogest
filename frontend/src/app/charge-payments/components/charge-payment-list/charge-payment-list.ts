import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';


import { ChargePayment } from '../../../model/chargepayment';
import { ChargePaymentService } from '../../../services/chargepayment/charge-payment-service';

/** TO DO */

@Component({
  selector: 'app-charge-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './charge-payment-list.html',
  styleUrl: './charge-payment-list.scss'
})
export class ChargePaymentList implements OnInit{
  chargePayments: ChargePayment[]= [];
  createdMessage: string | null = null;
 
  constructor(
    private chargePaymentService: ChargePaymentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le paiement a été correctement enregistré.";
        setTimeout(() => this.createdMessage = null, 5000);
      }

      this.chargePaymentService.fetchAll().subscribe((chargePayments: ChargePayment[]) => {
        this.chargePayments = chargePayments;
      })
    });      
  }
}
