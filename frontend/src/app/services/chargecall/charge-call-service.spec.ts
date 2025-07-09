import { TestBed } from '@angular/core/testing';

import { ChargeCallService } from './charge-call-service';

describe('ChargeCallService', () => {
  let service: ChargeCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
