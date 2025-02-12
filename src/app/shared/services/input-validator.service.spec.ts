import { TestBed } from '@angular/core/testing';

import { InputValidatorService } from './input-validator.service';

describe('InputValidatorService', () => {
  let service: InputValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
