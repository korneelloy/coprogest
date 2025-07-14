import { TestBed } from '@angular/core/testing';

import { ChargePaymentService } from './charge-payment-service';

describe('ChargePaymentService', () => {
  let service: ChargePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
