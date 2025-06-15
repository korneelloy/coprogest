import { TestBed } from '@angular/core/testing';

import { UnitUnitGroupService } from './unit-unit-group-service';

describe('UnitUnitGroupService', () => {
  let service: UnitUnitGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitUnitGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
