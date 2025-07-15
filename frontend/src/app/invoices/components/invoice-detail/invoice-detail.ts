import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { Invoice } from '../../../model/invoice';
import { InvoiceService } from '../../../services/invoice/invoice-service';
import { StateLabelPipe } from '../../../label/state/state-label-pipe';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';


@Component({
  selector: 'app-invoice-detail',
  imports: [CommonModule, StateLabelPipe, RouterModule],
  templateUrl: './invoice-detail.html',
  styleUrl: './invoice-detail.scss'
})
export class InvoiceDetail implements OnInit {
  invoice$!: Observable<Invoice>;
  updatedMessage: string | null = null;
  createdAndClossed: boolean = false;
  createdAndQuestion: boolean = false;
  wellNoted: boolean = false;
  openAmount: string = "";
  resolutionId: string = "";
  invoiceId: string = "";


  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router,
    private agResolutionService: AgResolutionService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "La facture a été mise à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        } else if (params.get('createdAndClosed') === 'true') {
          this.createdAndClossed = true;
        } else if(params.get('createdAndQuestion') === 'true') {
          this.openAmount = params.get('openAmount')!;
          this.resolutionId = params.get('resolutionId')!;
          this.createdAndQuestion = true;
        } 
      });      
      this.invoice$ = this.invoiceService.fetchById(id);
    }    
  }

  deletion(id: string): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Attention, action irréversible !");
    if (confirmed) {
      this.invoiceService.delete(id).subscribe(() => {
        this.router.navigate(['/invoices'], { queryParams: { deleted: 'true' } });
      });
    }
  }

  change(id: string): void {
    this.router.navigate(['/invoices', id, 'edit']);
  }

  closeBudget(resolutionId: string){
    this.agResolutionService.updateStatus(resolutionId, "accepted", 0).subscribe({
      next: () => {
        this.router.navigate(['/invoices'], { queryParams: { createdAndClosed: 'true' } });
      },
      error: (err) => {
        console.error('Failed to update status', err);
      }
    });
  }

  keepOpen() {
    this.createdAndQuestion = false;
    this.wellNoted = true;
    setTimeout(() => this.wellNoted = false, 5000);    
  }

}
