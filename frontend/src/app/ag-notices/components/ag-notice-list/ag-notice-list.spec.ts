import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgNoticeList } from './ag-notice-list';

describe('AgNoticeList', () => {
  let component: AgNoticeList;
  let fixture: ComponentFixture<AgNoticeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgNoticeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgNoticeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
