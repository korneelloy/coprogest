import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgMinutesForm } from './ag-minutes-form';

describe('AgMinutesForm', () => {
  let component: AgMinutesForm;
  let fixture: ComponentFixture<AgMinutesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgMinutesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgMinutesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
