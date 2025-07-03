import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AgMinutes } from '../../../model/agminutes';
import { AgMinutesService } from '../../../services/agminutes/ag-minutes-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

@Component({
  selector: 'app-ag-minutes-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ag-minutes-form.html',
  styleUrl: './ag-minutes-form.scss'
})
export class AgMinutesForm implements OnInit {
  agMinutesForm: FormGroup;
  isEditMode = false;
  agMinutesId: string | null = null;
  agResolutions$!: Observable<AgResolution[]>;
  allNoticesWithoutMinutes: AgResolution[] = [];

  deletedMessage: string | null = null;
 
  requiredMajorityLabels: { [key: string]: string } = {
    "24": 'Article 24',
    "25": 'Article 25',
    "25-1": 'Article 25-1',
    "26": 'Article 26',
    "unanimiy": 'Unanimité',
    "no_vote": 'Sans vote',
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agMinutesService: AgMinutesService,
    private agResolutionService: AgResolutionService,
    private agNoticeService : AgNoticeService
  ) {
    this.agMinutesForm = this.fb.group({
      ag_date: [''],
      ag_time: [''],
      place: [''],
      notice_id: ['']
    });
  }

  ngOnInit(): void {
    this.agMinutesId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agMinutesId;

    if (!this.isEditMode){
      this.agResolutionService.fetchAllNoticesWithoutMinutes().subscribe((data: AgResolution[]) => {
        this.allNoticesWithoutMinutes = data;
      });      
      this.agMinutesForm.get('notice_id')?.setValidators([Validators.required]);

    } else if (this.isEditMode) {
      this.route.queryParams.subscribe(params => {
        if (params['deleted'] === 'true') {
          this.deletedMessage = "Le compte rendu a été supprimée avec succès.";
        }
      });
      this.agMinutesForm.get('ag_date')?.setValidators([Validators.required]);
      this.agMinutesForm.get('ag_time')?.setValidators([Validators.required]);
      this.agMinutesForm.get('place')?.setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ])
      
      this.agResolutions$ = this.agResolutionService.fetchAllByAgMinutes(this.agMinutesId!);

      this.agMinutesService.fetchById(this.agMinutesId!).subscribe((agMinutes: AgMinutes) => {
        const dateObj = new Date(agMinutes.minutes_date);
        const pad = (n: number) => n.toString().padStart(2, '0');

        const datePart = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
        const timePart = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
        this.agMinutesForm.patchValue({
          place: agMinutes.place,
          ag_date: datePart,
          ag_time: timePart
        });
      });
    }
  }

  onSubmit(): void {
    if (this.agMinutesForm.invalid) return;

    const formData = this.agMinutesForm.value;

    const combinedDateTimeStr = `${formData.ag_date}T${formData.ag_time}:00`;

    const finalData: AgMinutes = {
      ...formData,
      minutes_date: combinedDateTimeStr,
    };

    if (this.isEditMode) {
      this.agMinutesService.update(this.agMinutesId!, finalData).subscribe(() => {
        this.router.navigate(['/agminutes', this.agMinutesId], { queryParams: { updated: 'true' } });
      });
   } else {
      this.agNoticeService.fetchById(finalData.notice_id!).subscribe((agNotice) => {
        finalData.place = agNotice.place;
        finalData.minutes_date = agNotice.ag_date;
        this.agMinutesService.create(finalData).subscribe((createdMinutes) => {
          const newMinutesId = createdMinutes.id;      
          this.agResolutionService.fetchAllByAgNotice(finalData.notice_id!).subscribe((resolutions) => {
            resolutions.forEach((resolution) => {
              resolution.id_ag_minutes = newMinutesId;
              this.agResolutionService.updateMinutesLink(resolution.id, newMinutesId).subscribe();
            });
      
            this.router.navigate(['/agminutes'], { queryParams: { created: 'true' } });
          });
        });
      });
    }
  }
}
