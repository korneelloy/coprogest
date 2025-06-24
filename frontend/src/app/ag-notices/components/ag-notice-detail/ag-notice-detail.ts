
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
      });      

      this.agResolutions$ = this.agResolutionService.fetchAllByAgNotice(id);
    
      this.agNotice$ = this.agNoticeService.fetchById(id);
    };    
  }
  
  change(id: string): void {
    this.router.navigate(['/agnotices', id, 'edit']);
  }

  seeDetailsResolution(id: string): void {
    this.router.navigate(['/agresolutions', id]);
  }
}
