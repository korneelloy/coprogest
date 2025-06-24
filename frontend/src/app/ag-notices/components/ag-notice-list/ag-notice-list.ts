import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AgNotice } from '../../../model/agnotice';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ag-notice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ag-notice-list.html',
  styleUrl: './ag-notice-list.scss'
})
export class AgNoticeList implements OnInit{
  agnotices$!: Observable<AgNotice[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  constructor(
    private agNoticeService: AgNoticeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "La convocation a été créée avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      this.agnotices$ = this.agNoticeService.fetchAll();
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/agnotices', id]);  
  }
}

