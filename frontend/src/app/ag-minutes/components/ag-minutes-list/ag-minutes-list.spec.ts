import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgMinutesList } from './ag-minutes-list';

describe('AgMinutesList', () => {
  let component: AgMinutesList;
  let fixture: ComponentFixture<AgMinutesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgMinutesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgMinutesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
