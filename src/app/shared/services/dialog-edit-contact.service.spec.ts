import { TestBed } from '@angular/core/testing';

import { DialogEditContactService } from './dialog-edit-contact.service';

describe('DialogEditContactService', () => {
  let service: DialogEditContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogEditContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
