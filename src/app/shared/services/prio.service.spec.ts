import { TestBed } from '@angular/core/testing';

import { PrioService } from './prio.service';

describe('PrioService', () => {
  let service: PrioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
