import { TestBed } from '@angular/core/testing';

import { AgNoticePrintService } from './ag-notice-print-service';

describe('AgNoticePrintService', () => {
  let service: AgNoticePrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgNoticePrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
