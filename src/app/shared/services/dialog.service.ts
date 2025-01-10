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
    subtask: false,
  };
  assignedTo: string = '';

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

  /**
   * Switches the dialog.
   * @param id - The dialog id.
   * @returns - A boolean value.
   */
  switch(id: string) {
    !this.isOpened(id) ? this.open(id) : this.close(id);
  }

  /**
   * Provides the source path of the arrow.
   * @param id - The dialog id.
   * @returns - The source path of the arrow.
   */
  getArrowSrc(id: string) {
    if (this.isOpened(id)) {
      return '/assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '/assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  /**
   * Resets the assigned-to input value.
   */
  resetAssignedTo() {
    this.assignedTo = '';
  }
}
