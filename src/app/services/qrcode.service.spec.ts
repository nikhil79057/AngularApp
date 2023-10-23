import { TestBed } from '@angular/core/testing';

import { QRCodeService } from './qrcode.service';

describe('QRCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QRCodeService = TestBed.get(QRCodeService);
    expect(service).toBeTruthy();
  });
});
