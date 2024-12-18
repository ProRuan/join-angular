import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  opened: { [key: string]: boolean } = {
    assignedTo: false,
    category: false,
  };

  // close category selection on main!!!

  open(key: string) {
    this.opened[key] = true;
  }

  close(key: string) {
    this.opened[key] = false;
  }

  isOpened(key: string) {
    return this.opened[key];
  }
}
