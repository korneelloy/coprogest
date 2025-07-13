import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AgMinutes } from '../../../model/agminutes';
import { AgMinutesService } from '../../../services/agminutes/ag-minutes-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

import { RequiredMajorityLabelPipe } from '../../../label/requiredMajority/required-majority-label-pipe';

import { AgMinutesPrintService } from '../../../services/printAgMinutes/ag-minutes-print-service';


@Component({
  selector: 'app-ag-minutes-detail',
  imports: [CommonModule, RequiredMajorityLabelPipe],
  templateUrl: './ag-minutes-detail.html',
  styleUrl: './ag-minutes-detail.scss'
})
export class AgMinutesDetail implements OnInit {
  agMinute$!: Observable<AgMinutes>;
  updatedMessage: string | null = null;

  agResolutions$!: Observable<AgResolution[]>;

  constructor(
    private route: ActivatedRoute,
    private agMinutesService: AgMinutesService,
    private router: Router,
    private agResolutionService: AgResolutionService,
    private agMinutesPrintService: AgMinutesPrintService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "Le compte rendu a été mise à jour avec succès.";
        }
      });      

      this.agResolutions$ = this.agResolutionService.fetchAllByAgMinutes(id);
    
      this.agMinute$ = this.agMinutesService.fetchById(id);
    };    
  }
  
  change(id: string): void {
    this.router.navigate(['/agminutes', id, 'edit']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  generateMinuteWord(agMinuteId: string): void {
    this.agMinutesPrintService.downloadMinute(agMinuteId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compte-rendu-${agMinuteId}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error("Erreur lors de la génération du compte rendu", error.message);
      }
    });
  }

}
