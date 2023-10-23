import { TestBed } from '@angular/core/testing';

import { CheckinCheckoutService } from './checkin-checkout.service';

describe('CheckinCheckoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckinCheckoutService = TestBed.get(CheckinCheckoutService);
    expect(service).toBeTruthy();
  });
});
