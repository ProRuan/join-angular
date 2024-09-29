import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogAddTaskService {
  closed: boolean = true;

  constructor() {}

  open() {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }
}
