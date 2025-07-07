import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

@Component({
  selector: 'app-ag-notice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ag-notice-form.html',
  styleUrl: './ag-notice-form.scss'
})
export class AgNoticeForm implements OnInit {
  agNoticeForm: FormGroup;
  isEditMode = false;
  agNoticeId: string | null = null;
  agResolutions$!: Observable<AgResolution[]>;

  deletedMessage: string | null = null;
 
  requiredMajorityLabels: { [key: string]: string } = {
    "24": "Article 24 - Majorité simple des voix exprimées (abstentions non prises en compte)",
    "25": "Article 25 - Majorité absolue requise (pas de second vote possible)",
    "25-1": "Article 25-1 - Second vote possible à la majorité simple, si le quorum est atteint",
    "26": "Article 26 - Double majorité : au moins 2/3 des voix de tous les copropriétaires ET la majorité en nombre des copropriétaires présents ou représentés",
    "unanimity": "Article 26-1 - Unanimité de tous les copropriétaires requise",
    "no_vote": "Sans vote - Décision prise sans procédure de vote"
  };


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agNoticeService: AgNoticeService,
    private agResolutionService: AgResolutionService
  ) {
    this.agNoticeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      place: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      ag_date: ['', [Validators.required]],
      ag_time: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.agNoticeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agNoticeId;

    if (this.isEditMode) {
      this.route.queryParams.subscribe(params => {
        if (params['deleted'] === 'true') {
          this.deletedMessage = "La résolution a été supprimée avec succès.";
        }
      });

      this.agResolutions$ = this.agResolutionService.fetchAllByAgNotice(this.agNoticeId!);

      this.agNoticeService.fetchById(this.agNoticeId!).subscribe((agNotice: AgNotice) => {
        const dateObj = new Date(agNotice.ag_date);
        const pad = (n: number) => n.toString().padStart(2, '0');

        const datePart = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
        const timePart = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
        this.agNoticeForm.patchValue({
          title: agNotice.title,
          place: agNotice.place,
          ag_date: datePart,
          ag_time: timePart
        });
      });
    }
  }

  onSubmit(): void {
    if (this.agNoticeForm.invalid) return;

    const formData = this.agNoticeForm.value;

    const combinedDateTimeStr = `${formData.ag_date}T${formData.ag_time}:00`;

    const finalData: AgNotice = {
      ...formData,
      ag_date: combinedDateTimeStr,
      ag_time: formData.ag_time
    };

    if (this.isEditMode) {
      this.agNoticeService.update(this.agNoticeId!, finalData).subscribe(() => {
        this.router.navigate(['/agnotices', this.agNoticeId], { queryParams: { updated: 'true' } });
      });
    } else {
      this.agNoticeService.create(finalData).subscribe(() => {
        this.router.navigate(['/agnotices'], { queryParams: { created: 'true' } });
      });
    }
  }

  deletion(id: string): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer la résolution ? Attention, action irréversible !");
    
    if (confirmed) {
      this.agResolutionService.delete(id).subscribe(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('deleted', 'true');
        window.location.href = url.toString();
      });
    }
  }

}
