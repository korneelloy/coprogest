import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-charge-payment-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './charge-payment-list.html',
  styleUrl: './charge-payment-list.scss'
})
export class ChargePaymentList {

}

/** TO DO */