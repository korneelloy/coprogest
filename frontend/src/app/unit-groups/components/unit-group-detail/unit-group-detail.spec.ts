import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGroupDetail } from './unit-group-detail';

describe('UnitGroupDetail', () => {
  let component: UnitGroupDetail;
  let fixture: ComponentFixture<UnitGroupDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitGroupDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitGroupDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
