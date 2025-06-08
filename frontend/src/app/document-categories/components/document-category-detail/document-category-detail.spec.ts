import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryDetail } from './document-category-detail';

describe('DocumentCategoryDetail', () => {
  let component: DocumentCategoryDetail;
  let fixture: ComponentFixture<DocumentCategoryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCategoryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCategoryDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
