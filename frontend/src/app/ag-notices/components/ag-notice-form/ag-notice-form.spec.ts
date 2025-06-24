import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgNoticeForm } from './ag-notice-form';

describe('AgNoticeForm', () => {
  let component: AgNoticeForm;
  let fixture: ComponentFixture<AgNoticeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgNoticeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgNoticeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
