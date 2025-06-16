import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../services/document/document-service';
import { DocumentCategoryService } from '../../../services/document-category/document-category-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Document } from '../../../model/document';
import { DocumentCategory } from '../../../model/documentcategory';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './document-form.html',
  styleUrls: ['./document-form.scss']
})
export class DocumentForm implements OnInit {
  documentForm: FormGroup;
  isEditMode = false;
  documentId: string | null = null;

  categories: DocumentCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private documentCategoryService: DocumentCategoryService
  ) {
    this.documentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i)]],
      id_document_category: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.documentId;

    this.documentCategoryService.fetchAll().subscribe((data: DocumentCategory[]) => {
      this.categories = data;
    });

    if (this.isEditMode) {
      this.documentService.fetchById(this.documentId!).subscribe((doc: Document) => {
        this.documentForm.patchValue({
          name: doc.name,
          url: doc.url,
          id_document_category: doc.id_document_category,
          description: doc.description
        });
      });
    }
  }

  onSubmit(): void {
    if (this.documentForm.invalid) return;

    const formData = this.documentForm.value;

    if (this.isEditMode) {
      this.documentService.update(this.documentId!, formData).subscribe(() => {
        this.router.navigate(['/documents', this.documentId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      this.documentService.create(formData).subscribe(() => {
        this.router.navigate(['/documents'], { queryParams: { created: 'true' } });
      });
    }
  }
}
