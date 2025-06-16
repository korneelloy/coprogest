import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGroupForm } from './unit-group-form';

describe('UnitGroupForm', () => {
  let component: UnitGroupForm;
  let fixture: ComponentFixture<UnitGroupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitGroupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitGroupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
