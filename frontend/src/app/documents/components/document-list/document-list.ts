import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Document } from '../../../model/document';
import { DocumentService } from '../../../services/document/document-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DocumentCategoryService } from '../../../services/document-category/document-category-service';
import { DocumentCategory } from '../../../model/documentcategory';



@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList implements OnInit{
  documents$!: Observable<Document[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  categories: DocumentCategory[] = [];


  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private documentCategoryService: DocumentCategoryService
  ) {}

  ngOnInit(): void {
    this.documentCategoryService.fetchAll().subscribe((data: DocumentCategory[]) => {
      this.categories = data;
    });
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

  filter(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    if (selectedId == ""){
      const all = document.getElementsByClassName("listitems");
      for (const el of all) {
        (el as HTMLElement).style.display = "block";
    }
    } else {
      const all = document.getElementsByClassName("listitems");
      for (const el of all) {
        (el as HTMLElement).style.display = "none";
      }
      const selected = document.getElementsByClassName(selectedId);
      for (const el of selected) {
        (el as HTMLElement).style.display = "block";
      }
    }
  }
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
  
}
