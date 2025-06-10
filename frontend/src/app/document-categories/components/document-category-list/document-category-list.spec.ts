import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryList } from './document-category-list';

describe('DocumentCategoryList', () => {
  let component: DocumentCategoryList;
  let fixture: ComponentFixture<DocumentCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCategoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCategoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
