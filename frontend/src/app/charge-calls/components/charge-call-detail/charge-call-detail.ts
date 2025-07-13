
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChargeCallStatePipe } from '../../../label/chargeCallState/charge-call-state-pipe';

import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';

import { ChargeLine } from '../../../model/chargeLine';
import { ChargeLineService } from '../../../services/chargeLine/charge-line-service';



@Component({
  selector: 'app-charge-call-detail',
  imports: [CommonModule, ChargeCallStatePipe],
  templateUrl: './charge-call-detail.html',
  styleUrl: './charge-call-detail.scss'
})
export class ChargeCallDetail implements OnInit {
  chargeCall!: ChargeCall;
  chargeCallId: string = "";
  chargeLines: ChargeLine[] = [];


  constructor(
    private route: ActivatedRoute,
    private chargeCallService: ChargeCallService,
    private chargeLineService: ChargeLineService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chargeCallService.fetchById(id).subscribe((chargeCall: ChargeCall) => {
        this.chargeCall = chargeCall;
        this.chargeLineService.fetchByChargeCallId(id).subscribe((chargeLines: ChargeLine[]) => {
          this.chargeLines = chargeLines;
        })
      })
    }
  }
}
