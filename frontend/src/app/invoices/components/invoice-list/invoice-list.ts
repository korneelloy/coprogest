import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Invoice } from '../../../model/invoice';
import { InvoiceService } from '../../../services/invoice/invoice-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StateLabelPipe } from '../../../label/state/state-label-pipe';


@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule, StateLabelPipe],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss'
})
export class InvoiceList implements OnInit{
  invoices$!: Observable<Invoice[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;
  createdAndClossed: boolean = false;

  states = [
    { key: "to_be_paid", value: "À payer" },
    { key: "contested", value: "Facture en litige" },
    { key: "paid", value: "Payé" }
  ];
  


  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "La facture a été rajoutée avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      else if (params.get('deleted') === 'true') {
        this.deletedMessage = 'Facture supprimée avec succès.';
        setTimeout(() => this.deletedMessage = null, 5000);
      } else if (params.get('createdAndClosed') === 'true') {
        this.createdAndClossed = true;
        setTimeout(() => this.createdAndClossed = false, 5000);

      }
      this.invoices$ = this.invoiceService.fetchAll();
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/invoices', id]);  
  }

  editDocument(id: string): void {
    this.router.navigate(['/invoices', id, 'edit']);  
  }

 

  
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
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
  
}
