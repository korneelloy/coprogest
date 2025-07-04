import { TestBed } from '@angular/core/testing';

import { AgResolutionPersonService } from './ag-resolution-person-service';

describe('AgResolutionPersonService', () => {
  let service: AgResolutionPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgResolutionPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
