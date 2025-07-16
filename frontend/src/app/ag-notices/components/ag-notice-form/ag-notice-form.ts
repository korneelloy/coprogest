import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

import { RequiredMajorityLabelPipe } from '../../../label/requiredMajority/required-majority-label-pipe';

@Component({
  selector: 'app-ag-notice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, RequiredMajorityLabelPipe],
  templateUrl: './ag-notice-form.html',
  styleUrl: './ag-notice-form.scss'
})
export class AgNoticeForm implements OnInit {
  agNoticeForm: FormGroup;
  isEditMode = false;
  agNoticeId: string | null = null;
  agResolutions: AgResolution[] = [];

  message: string | null = null;
 
  readOnly: boolean = false;
  idAgMinutes: string = "";

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

    this.route.queryParams.subscribe(params => {
      if (params['deletedResolution'] === 'true') {
        this.message = "La résolution a été supprimée avec succès.";
      } else if (params['createdResolution'] === 'true') {
        this.message = "La résolution a été créée.";
      } else if (params['updatedResolution'] === 'true') {
        this.message = "La résolution a été mise à jour avec succès.";
      }
      if (this.message) {
        setTimeout(() => this.message = null, 5000);    
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });


    if (this.isEditMode) {
      this.agResolutionService.fetchAllByAgNotice(this.agNoticeId!).subscribe((agResolutions: AgResolution[]) => {
        this.agResolutions = agResolutions;
        for (const resolution of agResolutions) {
          if (resolution.id_ag_minutes) {
            this.readOnly = true;
            this.idAgMinutes = resolution.id_ag_minutes;
            return;
          }
        }
      });

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
        url.searchParams.set('deletedResolution', 'true');
        window.location.href = url.toString();
      });
    }
  }

}
