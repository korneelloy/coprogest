import { TestBed } from '@angular/core/testing';

import { ChargeLineService } from './charge-line-service';

describe('ChargeLineService', () => {
  let service: ChargeLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
