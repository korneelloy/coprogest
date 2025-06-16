import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitList } from './unit-list';

describe('UnitList', () => {
  let component: UnitList;
  let fixture: ComponentFixture<UnitList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
