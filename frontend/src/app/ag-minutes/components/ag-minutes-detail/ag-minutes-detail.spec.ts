import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgMinutesDetail } from './ag-minutes-detail';

describe('AgMinutesDetail', () => {
  let component: AgMinutesDetail;
  let fixture: ComponentFixture<AgMinutesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgMinutesDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgMinutesDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
