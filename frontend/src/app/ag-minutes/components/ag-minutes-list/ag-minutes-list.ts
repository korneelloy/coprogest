import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AgMinutes } from '../../../model/agminutes';
import { AgMinutesService } from '../../../services/agminutes/ag-minutes-service';


@Component({
  selector: 'app-ag-minutes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ag-minutes-list.html',
  styleUrl: './ag-minutes-list.scss'
})
export class AgMinutesList implements OnInit{
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  agMinutes: AgMinutes[] = [];


  constructor(
    private agMinutesService: AgMinutesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le compte rendu de la réunion d'AG a été créée avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      setTimeout(() => {
        this.agMinutesService.fetchAll().subscribe((agMinutes: AgMinutes[]) => {
          this.agMinutes = agMinutes;   
        });
      }, 200); 
    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/agminutes', id]);  
  }

  editMinute(id: string): void {
    this.router.navigate(['/agminutes', id, 'edit']);  
  }
}
