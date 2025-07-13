import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';

import { AgNoticePrintService } from '../../../services/printAgNotice/ag-notice-print-service';

import { RequiredMajorityLabelPipe } from '../../../label/requiredMajority/required-majority-label-pipe';

@Component({
  selector: 'app-ag-notice-detail',
  imports: [CommonModule, RequiredMajorityLabelPipe],
  templateUrl: './ag-notice-detail.html',
  styleUrl: './ag-notice-detail.scss'
})
export class AgNoticeDetail implements OnInit {
  agNotice$!: Observable<AgNotice>;
  updatedMessage: string | null = null;

  agResolutions$!: Observable<AgResolution[]>;

  constructor(
    private route: ActivatedRoute,
    private agNoticeService: AgNoticeService,
    private router: Router,
    private agResolutionService: AgResolutionService,
    private agNoticePrintService: AgNoticePrintService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "La convocation a été mise à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }

        if (params.get('updatedResolution') === 'true') {
          this.updatedMessage = "La résolution a été mise à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      

      this.agResolutions$ = this.agResolutionService.fetchAllByAgNotice(id);
    
      this.agNotice$ = this.agNoticeService.fetchById(id);
    };    
  }
  
  change(id: string): void {
    this.router.navigate(['/agnotices', id, 'edit']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  seeDetailsResolution(id: string): void {
    this.router.navigate(['/agresolutions', id]);
  }
  
  generateWord(agNoticeId: string): void {
    this.agNoticePrintService.downloadConvocation(agNoticeId).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `convocation-${agNoticeId}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: error => {
        console.error("Erreur lors de la génération du document", error.message);
      }
    });
  }
  
}
