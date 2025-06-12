import { TestBed } from '@angular/core/testing';

import { UnitGroupService } from './unit-group-service';

describe('UnitGroupService', () => {
  let service: UnitGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
