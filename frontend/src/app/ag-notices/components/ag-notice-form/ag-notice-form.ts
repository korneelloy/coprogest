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
      this.agResolutions$ = this.agResolutionService.fetchAllByAgNotice(this.agNoticeId!);

      this.agNoticeService.fetchById(this.agNoticeId!).subscribe((agNotice: AgNotice) => {
        const dateObj = new Date(agNotice.ag_date);

        const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = dateObj.toISOString().split('T')[1].slice(0, 5); // HH:mm

        this.agNoticeForm.patchValue({
          title: agNotice.title,
          place: agNotice.place,
          ag_date: formattedDate,
          ag_time: formattedTime
        });
      });
    }
  }

  onSubmit(): void {
    if (this.agNoticeForm.invalid) return;

    const formData = this.agNoticeForm.value;

    // Combine date and time to ISO format
    const combinedDateTimeStr = `${formData.ag_date}T${formData.ag_time}:00`;
    const isoDate = new Date(combinedDateTimeStr).toISOString();

    const finalData: AgNotice = {
      ...formData,
      ag_date: isoDate,
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
}
