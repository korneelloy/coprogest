import { TestBed } from '@angular/core/testing';

import { AgMinutesService } from './ag-minutes-service';

describe('AgMinutesService', () => {
  let service: AgMinutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgMinutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
