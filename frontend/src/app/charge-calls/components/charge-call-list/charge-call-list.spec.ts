import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCallList } from './charge-call-list';

describe('ChargeCallList', () => {
  let component: ChargeCallList;
  let fixture: ComponentFixture<ChargeCallList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeCallList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeCallList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
