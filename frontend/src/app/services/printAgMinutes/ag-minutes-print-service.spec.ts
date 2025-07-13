import { TestBed } from '@angular/core/testing';

import { AgMinutesPrintService } from './ag-minutes-print-service';

describe('AgMinutesPrintService', () => {
  let service: AgMinutesPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgMinutesPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
