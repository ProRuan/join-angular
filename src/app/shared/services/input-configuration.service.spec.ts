import { TestBed } from '@angular/core/testing';

import { InputConfigurationService } from './input-configuration.service';

describe('InputConfigurationService', () => {
  let service: InputConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
