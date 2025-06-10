import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Document } from '../../../model/document';
import { DocumentService } from '../../../services/document/document-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-document-list',
  imports: [CommonModule],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList implements OnInit{
  documents$!: Observable<Document[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;



  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "Le document a été créé avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      else if (params.get('deleted') === 'true') {
        this.deletedMessage = 'Document supprimé avec succès.';
        setTimeout(() => this.deletedMessage = null, 5000);
      }
      this.documents$ = this.documentService.fetchAll();

    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/documents', id]);  
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
