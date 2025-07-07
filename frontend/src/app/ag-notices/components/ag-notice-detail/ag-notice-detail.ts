
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';


@Component({
  selector: 'app-ag-notice-detail',
  imports: [CommonModule],
  templateUrl: './ag-notice-detail.html',
  styleUrl: './ag-notice-detail.scss'
})
export class AgNoticeDetail implements OnInit {
  agNotice$!: Observable<AgNotice>;
  updatedMessage: string | null = null;

  agResolutions$!: Observable<AgResolution[]>;

  requiredMajorityLabels: { [key: string]: string } = {
    "24": "Article 24 - Majorité simple des voix exprimées (abstentions non prises en compte)",
    "25": "Article 25 - Majorité absolue requise (pas de second vote possible)",
    "25-1": "Article 25-1 - Second vote possible à la majorité simple, si le quorum est atteint",
    "26": "Article 26 - Double majorité : au moins 2/3 des voix de tous les copropriétaires ET la majorité en nombre des copropriétaires présents ou représentés",
    "unanimity": "Article 26-1 - Unanimité de tous les copropriétaires requise",
    "no_vote": "Sans vote - Décision prise sans procédure de vote"
  };

  constructor(
    private route: ActivatedRoute,
    private agNoticeService: AgNoticeService,
    private router: Router,
    private agResolutionService: AgResolutionService
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
}
