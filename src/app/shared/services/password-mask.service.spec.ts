import { TestBed } from '@angular/core/testing';

import { PasswordMaskService } from './password-mask.service';

describe('PasswordMaskService', () => {
  let service: PasswordMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
