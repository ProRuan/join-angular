import { TestBed } from '@angular/core/testing';

import { ContactViewerService } from './contact-viewer.service';

describe('ContactViewerService', () => {
  let service: ContactViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
