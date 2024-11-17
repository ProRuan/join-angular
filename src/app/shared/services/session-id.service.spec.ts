import { TestBed } from '@angular/core/testing';

import { SessionIdService } from './session-id.service';

describe('SessionIdService', () => {
  let service: SessionIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
