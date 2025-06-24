import { TestBed } from '@angular/core/testing';

import { AgNoticeService } from './ag-notice-service';

describe('AgNoticeService', () => {
  let service: AgNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgNoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
