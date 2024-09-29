import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogViewTaskService {
  closed: boolean = true;

  constructor() {}

  open() {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }
}
