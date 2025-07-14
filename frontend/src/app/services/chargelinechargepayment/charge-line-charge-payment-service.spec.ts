import { TestBed } from '@angular/core/testing';

import { ChargeLineChargePaymentService } from './charge-line-charge-payment-service';

describe('ChargeLineChargePaymentService', () => {
  let service: ChargeLineChargePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeLineChargePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
