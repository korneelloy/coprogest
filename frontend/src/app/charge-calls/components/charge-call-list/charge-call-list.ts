import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ChargeCallStatePipe } from '../../../label/chargeCallState/charge-call-state-pipe';



@Component({
  selector: 'app-charge-call-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ChargeCallStatePipe],
  templateUrl: './charge-call-list.html',
  styleUrl: './charge-call-list.scss'
})
export class ChargeCallList implements OnInit{
  chargeCalls: ChargeCall[]= [];
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  states = ['to_be_sent', 'send', 'remainder', 'paid'];
 

  constructor(
    private chargeCallService: ChargeCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    /**TO DO a verifier */
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "L'appel de charge a été rajouté avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }

      this.chargeCallService.fetchAll().subscribe((chargeCalls: ChargeCall[]) => {
        this.chargeCalls = chargeCalls;
        console.log(this.chargeCalls);
      })
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/chargecalls', id]);  
  }

  generateWord(chargeCallId: string): void {
    console.log("to be implemented")
    /**TO DO */
    /** 
    this.chargeCallPrintService.downloadConvocation(chargeCallId).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chargecall-${chargeCallId}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: error => {
        console.error("Erreur lors de la génération du document", error.message);
      }
    });
    */
  }

  /**TO DO a verifier */
  filter(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    if (selectedId == ""){
      const all = document.getElementsByClassName("listitems");
      for (const el of all) {
        (el as HTMLElement).style.display = "block";
    }
    } else {
      const all = document.getElementsByClassName("listitems");
      for (const el of all) {
        (el as HTMLElement).style.display = "none";
      }
      const selected = document.getElementsByClassName(selectedId);
      for (const el of selected) {
        (el as HTMLElement).style.display = "block";
      }
    }
  }
}
