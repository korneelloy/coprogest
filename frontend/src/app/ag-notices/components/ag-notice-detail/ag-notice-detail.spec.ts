import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgNoticeDetail } from './ag-notice-detail';

describe('AgNoticeDetail', () => {
  let component: AgNoticeDetail;
  let fixture: ComponentFixture<AgNoticeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgNoticeDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgNoticeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
