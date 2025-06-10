import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryForm } from './document-category-form';

describe('DocumentCategoryForm', () => {
  let component: DocumentCategoryForm;
  let fixture: ComponentFixture<DocumentCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
