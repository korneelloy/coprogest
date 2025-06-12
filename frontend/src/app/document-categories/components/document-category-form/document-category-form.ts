import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../services/document/document-service';
import { DocumentCategoryService } from '../../../services/document-category/document-category-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocumentCategory } from '../../../model/documentcategory';

@Component({
  selector: 'app-document-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './document-category-form.html',
  styleUrl: './document-category-form.scss'
})
export class DocumentCategoryForm implements OnInit {
  documentForm: FormGroup;
  isEditMode = false;
  documentCategoryId: string | null = null;

  categories: DocumentCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentCategoryService: DocumentCategoryService
  ) {
    this.documentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.documentCategoryId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.documentCategoryId;

    if (this.isEditMode) {
      this.documentCategoryService.fetchById(this.documentCategoryId!).subscribe((doc: DocumentCategory) => {
        this.documentForm.patchValue({
          name: doc.name
        });
      });
    }
  }

  onSubmit(): void {
    if (this.documentForm.invalid) return;

    const formData = this.documentForm.value;

    if (this.isEditMode) {
      this.documentCategoryService.update(this.documentCategoryId!, formData).subscribe(() => {
        this.router.navigate(['/documentcategories', this.documentCategoryId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      this.documentCategoryService.create(formData).subscribe(() => {
        this.router.navigate(['/documentcategories'], { queryParams: { created: 'true' } });
      });
    }
  }
}
