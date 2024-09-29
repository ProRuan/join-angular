import { TestBed } from '@angular/core/testing';

import { DialogAddTaskService } from './dialog-add-task.service';

describe('DialogAddTaskService', () => {
  let service: DialogAddTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAddTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
