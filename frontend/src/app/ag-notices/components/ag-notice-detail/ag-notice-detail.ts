
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ag-notice-detail',
  imports: [CommonModule],
  templateUrl: './ag-notice-detail.html',
  styleUrl: './ag-notice-detail.scss'
})
export class AgNoticeDetail implements OnInit {
  agNotice$!: Observable<AgNotice>;
  updatedMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private agNoticeService: AgNoticeService,
    private router: Router
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
      this.agNotice$ = this.agNoticeService.fetchById(id);
    };    
  }
  change(id: string): void {
    this.router.navigate(['/agnotices', id, 'edit']);
  }
}
