import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCallDetail } from './charge-call-detail';

describe('ChargeCallDetail', () => {
  let component: ChargeCallDetail;
  let fixture: ComponentFixture<ChargeCallDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeCallDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeCallDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
