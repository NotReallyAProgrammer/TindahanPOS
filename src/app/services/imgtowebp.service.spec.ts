import { TestBed } from '@angular/core/testing';

import { ImgtowebpService } from './imgtowebp.service';

describe('ImgtowebpService', () => {
  let service: ImgtowebpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgtowebpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
