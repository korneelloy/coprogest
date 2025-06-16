import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGroupList } from './unit-group-list';

describe('UnitGroupList', () => {
  let component: UnitGroupList;
  let fixture: ComponentFixture<UnitGroupList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitGroupList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitGroupList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
