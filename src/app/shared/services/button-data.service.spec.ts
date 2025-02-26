import { TestBed } from '@angular/core/testing';

import { ButtonDataService } from './button-data.service';

describe('ButtonDataService', () => {
  let service: ButtonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
