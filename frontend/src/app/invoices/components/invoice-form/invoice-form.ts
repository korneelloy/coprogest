import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice/invoice-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../../model/invoice';
import { RouterModule } from '@angular/router';
import { formatDateForInput } from '../../../utils/formatDateForInput';
import { formatDateForOutput } from '../../../utils/formatDateForOutput';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';



@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss'
})
export class InvoiceForm implements OnInit {
  invoiceForm: FormGroup;
  isEditMode = false;
  invoiceId: string | null = null;
  resolutionsWithBudgetActif: AgResolution[] = [];
  resolution: AgResolution | null = null;
  oldInvoices: Invoice[]= [];
  invoiceErrorMessage: string | null = null;
  tempValueIdResolution: string = ""; 


  states = [
    { key: "to_be_paid", value: "À payer" },
    { key: "contested", value: "Facture en litige" },
    { key: "paid", value: "Payé" }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private agResolutionService: AgResolutionService,
  ) {
    this.invoiceForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.pattern(/^\d{1,13}(\.\d{1,2})?$/)]],
      invoice_date: ['', Validators.required],
      state:['', Validators.required],
      id_ag_resolution: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.invoiceId;
    this.invoiceErrorMessage = "";

    
    this.agResolutionService.fetchAllWithActifBudget().subscribe((data: AgResolution[]) => {
      this.resolutionsWithBudgetActif = data;
    });



    if (this.isEditMode) {
      this.invoiceService.fetchById(this.invoiceId!).subscribe((invoice: Invoice) => {
        this.tempValueIdResolution = invoice.id_ag_resolution;
        this.invoiceForm.patchValue({
          description: invoice.description,
          amount: invoice.amount,
          invoice_date: formatDateForInput(invoice.invoice_date),
          state: invoice.state,
          id_ag_resolution: invoice.id_ag_resolution
        });
      })
      this.invoiceForm.get('id_ag_resolution')?.disable();
    } else {
      this.invoiceForm.patchValue({
        invoice_date: formatDateForInput(new Date())
      });
    }
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) return;

    const formData = this.invoiceForm.value;
    formData.invoice_date = formatDateForOutput(formData.invoice_date);

    if (this.isEditMode) {
      formData.id_ag_resolution = this.tempValueIdResolution;
      this.invoiceService.update(this.invoiceId!, formData).subscribe(() => {
        this.router.navigate(['/invoices', this.invoiceId], { queryParams: { updated: 'true' } });
      });
    } else {
      this.agResolutionService.fetchById(formData.id_ag_resolution).subscribe((resolution: AgResolution[]) => {
        this.resolution = resolution[0];
        this.invoiceService.fetchByResolution(formData.id_ag_resolution).subscribe((invoices: Invoice[]) => {
          this.oldInvoices = invoices;
          let alreadyUsedBudget: number = 0;
          for (const oldInvoice of this.oldInvoices) {
            alreadyUsedBudget += Number(oldInvoice.amount);
          }
          console.log("alreadyUsedBudget", alreadyUsedBudget);
          console.log("formData.amount", formData.amount);
          console.log("this.resolution!.budget_amount", this.resolution!.budget_amount);

        if ((alreadyUsedBudget + formData.amount) <= this.resolution!.budget_amount) {    
          this.invoiceService.create(formData).subscribe((response) => {
            if ((alreadyUsedBudget + formData.amount) === this.resolution!.budget_amount) {
              /* TO DO close budget*/
              this.router.navigate(['/invoices', response.id], { queryParams: { createdAndClosed: 'true' } });
            } else {
              const openAmount = Number(this.resolution!.budget_amount) - alreadyUsedBudget - formData.amount;
              this.router.navigate(['/invoices', response.id], { queryParams: { createdAndQuestion: 'true', openAmount: openAmount, resolutionId: this.resolution!.id} });
            }

          });
        } else {
          this.invoiceErrorMessage = "Le montant de la facture dépasse le budget disponible. Vous ne pouvez pas enregistrer cette facture.";
        }
      });
    });
   }
  }
}
