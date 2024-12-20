import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a dialog service.
 */
export class DialogService {
  opened: { [key: string]: boolean } = {
    assignedTo: false,
    category: false,
  };

  /**
   * Opens the dialog.
   * @param id - The dialog id.
   */
  open(id: string) {
    this.opened[id] = true;
  }

  /**
   * Closes the dialog.
   * @param id - The dialog id.
   */
  close(id: string) {
    this.opened[id] = false;
  }

  /**
   * Verifies the opened state of the dialog.
   * @param id - The dialog id.
   * @returns - A boolean value.
   */
  isOpened(id: string) {
    return this.opened[id];
  }
}
