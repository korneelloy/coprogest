import { TestBed } from '@angular/core/testing';

import { AgminutespresencepersonService } from './agminutespresenceperson-service';

describe('AgminutespresencepersonService', () => {
  let service: AgminutespresencepersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgminutespresencepersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
