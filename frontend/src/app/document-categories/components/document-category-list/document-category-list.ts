import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DocumentCategory } from '../../../model/documentcategory';
import { DocumentCategoryService } from '../../../services/document-category/document-category-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-document-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './document-category-list.html',
  styleUrl: './document-category-list.scss'
})

export class DocumentCategoryList implements OnInit{
  documentCategories$!: Observable<DocumentCategory[]>;
  createdMessage: string | null = null;
  deletedMessage: string | null = null;

  constructor(
    private documentCategoryService: DocumentCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('created') === 'true') {
        this.createdMessage = "La catégorie a été créée avec succès.";
        setTimeout(() => this.createdMessage = null, 5000);
      }
      else if (params.get('deleted') === 'true') {
        this.deletedMessage = 'La catégorie a été supprimée avec succès.';
        setTimeout(() => this.deletedMessage = null, 5000);
      }
      this.documentCategories$ = this.documentCategoryService.fetchAll();

    });      
  }

  seeDetails(id: string): void {
    this.router.navigate(['/documentcategories', id]);  
  }

  deletion(id: string): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Attention, action irréversible !");
    
    if (confirmed) {
      this.documentCategoryService.delete(id).subscribe(() => {
        this.router.navigate(['/documentcategories'], { queryParams: { deleted: 'true' } });
      });
    }
  }

  change(id: string): void {
    this.router.navigate(['/documentcategories', id, 'edit']);
  }
}

