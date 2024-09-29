import { TestBed } from '@angular/core/testing';

import { DialogAddContactService } from './dialog-add-contact.service';

describe('DialogAddContactService', () => {
  let service: DialogAddContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAddContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
