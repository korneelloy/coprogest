import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePaymentForm } from './charge-payment-form';

describe('ChargePaymentForm', () => {
  let component: ChargePaymentForm;
  let fixture: ComponentFixture<ChargePaymentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargePaymentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargePaymentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
