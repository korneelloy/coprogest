import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DocumentCategory } from '../../../model/documentcategory';
import { DocumentCategoryService } from '../../../services/document-category/document-category-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-category-detail',
  imports: [CommonModule],
   templateUrl: './document-category-detail.html',
  styleUrl: './document-category-detail.scss'
})

export class DocumentCategoryDetail implements OnInit {
  documentCategory$!: Observable<DocumentCategory>;
  updatedMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private documentCategoryService: DocumentCategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
          this.updatedMessage = "La catégorie a été mise à jour avec succès.";
          setTimeout(() => this.updatedMessage = null, 5000);
        }
      });      
      this.documentCategory$ = this.documentCategoryService.fetchById(id);
    }    
  }
}
