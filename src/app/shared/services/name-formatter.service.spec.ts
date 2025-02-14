import { TestBed } from '@angular/core/testing';

import { NameFormatterService } from './name-formatter.service';

describe('NameFormatterService', () => {
  let service: NameFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
