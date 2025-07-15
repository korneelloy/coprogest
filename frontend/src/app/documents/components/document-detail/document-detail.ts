import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Document } from '../../../model/document';
import { DocumentService } from '../../../services/document/document-service';


@Component({
  selector: 'app-document-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.scss']
})
export class DocumentDetail implements OnInit {
  document$!: Observable<Document>;
  updatedMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "Le document a été mis à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      
      this.document$ = this.documentService.fetchById(id);
    }    
  }
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
  deletion(id: string): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Attention, action irréversible !");
    
    if (confirmed) {
      this.documentService.delete(id).subscribe(() => {
        this.router.navigate(['/documents'], { queryParams: { deleted: 'true' } });
      });
    }
  }

  change(id: string): void {
    this.router.navigate(['/documents', id, 'edit']);
  }

}
