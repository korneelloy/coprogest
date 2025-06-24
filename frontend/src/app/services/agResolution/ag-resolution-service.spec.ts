import { TestBed } from '@angular/core/testing';

import { AgResolutionService } from './ag-resolution-service';

describe('AgResolutionService', () => {
  let service: AgResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
