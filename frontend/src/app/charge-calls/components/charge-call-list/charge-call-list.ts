import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ChargeCall } from '../../../model/chargecall';
import { ChargeCallService } from '../../../services/chargecall/charge-call-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-charge-call-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './charge-call-list.html',
  styleUrl: './charge-call-list.scss'
})
export class ChargeCallList implements OnInit{
  chargeCalls$!: Observable<ChargeCall[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  constructor(
    private chargeCallService: ChargeCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    /**TO DO a verifier */
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "La facture a été rajoutée avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      else if (params.get('deleted') === 'true') {
        this.deletedMessage = 'Facture supprimée avec succès.';
        setTimeout(() => this.deletedMessage = null, 5000);
      } 
      this.chargeCalls$ = this.chargeCallService.fetchAll();
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/chargecalls', id]);  
  }

  editDocument(id: string): void {
    this.router.navigate(['/chargecalls', id, 'edit']);  
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
