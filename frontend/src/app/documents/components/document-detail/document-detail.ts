import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Document } from '../../../model/document';
import { DocumentService } from '../../../services/document/document-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  imports: [CommonModule],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.scss']
})
export class DocumentDetail implements OnInit {
  document$!: Observable<Document>;
  updatedMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
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
}
