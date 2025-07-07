import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AgMinutes } from '../../../model/agminutes';
import { AgMinutesService } from '../../../services/agminutes/ag-minutes-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';


@Component({
  selector: 'app-ag-minutes-detail',
  imports: [CommonModule],
  templateUrl: './ag-minutes-detail.html',
  styleUrl: './ag-minutes-detail.scss'
})
export class AgMinutesDetail implements OnInit {
  agMinute$!: Observable<AgMinutes>;
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
    private agMinutesService: AgMinutesService,
    private router: Router,
    private agResolutionService: AgResolutionService
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
}
