import { TestBed } from '@angular/core/testing';

import { NameValidationService } from './name-validation.service';

describe('NameValidationService', () => {
  let service: NameValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
