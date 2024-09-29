import { TestBed } from '@angular/core/testing';

import { DialogViewTaskService } from './dialog-view-task.service';

describe('DialogViewTaskService', () => {
  let service: DialogViewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogViewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
