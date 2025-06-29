import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDateForm } from './call-date-form';

describe('CallDateForm', () => {
  let component: CallDateForm;
  let fixture: ComponentFixture<CallDateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallDateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallDateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
