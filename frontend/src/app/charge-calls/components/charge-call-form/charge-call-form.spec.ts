import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCallForm } from './charge-call-form';

describe('ChargeCallForm', () => {
  let component: ChargeCallForm;
  let fixture: ComponentFixture<ChargeCallForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeCallForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeCallForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
