import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgResolutionForm } from './ag-resolution-form';

describe('AgResolutionForm', () => {
  let component: AgResolutionForm;
  let fixture: ComponentFixture<AgResolutionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgResolutionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgResolutionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
