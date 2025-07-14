import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePaymentList } from './charge-payment-list';

describe('ChargePaymentList', () => {
  let component: ChargePaymentList;
  let fixture: ComponentFixture<ChargePaymentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargePaymentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargePaymentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
