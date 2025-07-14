import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePaymentDetail } from './charge-payment-detail';

describe('ChargePaymentDetail', () => {
  let component: ChargePaymentDetail;
  let fixture: ComponentFixture<ChargePaymentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargePaymentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargePaymentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
