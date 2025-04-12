import { TestBed } from '@angular/core/testing';

import { PhoneFormatterService } from './phone-formatter.service';

describe('PhoneFormatterService', () => {
  let service: PhoneFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
