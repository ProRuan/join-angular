import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a dialog service.
 */
export class DialogService {
  opened: { [key: string]: boolean } = {
    backlog: false,
    flipMenu: false,
    assignedTo: false,
    category: false,
    subtask: false,
    addTask: false,
    viewTask: false,
    editTask: false,
    deleteTask: false,
    taskSettings: false,
    addContact: false,
    viewContact: false,
    editContact: false,
    deleteContact: false,
    contactSettings: false,
  };

  search: AbstractControl | null = new FormControl('');
  submitted: boolean = false;
  fadedOut: boolean = false;
  posStyles = {};

  /**
   * Opens a dialog.
   * @param id - The dialog id.
   */
  open(id: string) {
    this.opened[id] = true;
  }

  /**
   * Closes a dialog.
   * @param id - The dialog id.
   */
  close(id: string) {
    this.opened[id] = false;
  }

  /**
   * Verifies the opened state of a dialog.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  isOpened(id: string) {
    return this.opened[id];
  }

  /**
   * Verifies the display state of a backlog.
   * @returns A boolean value.
   */
  isLogged() {
    return this.isOpened('backlog');
  }

  /**
   * Gets the css class of a backlog container.
   * @returns The css class of the backlog container.
   */
  getBacklogContClass() {
    return this.isLogged() ? 'backlog-visible' : 'backlog-hidden';
  }

  /**
   * Gets the css class of a backlog.
   * @returns The css class of a backlog.
   */
  getBacklogClass() {
    return this.isLogged() ? 'backlog-in' : 'backlog-out';
  }

  /**
   * Switches a dialog.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  switch(id: string) {
    !this.isOpened(id) ? this.open(id) : this.close(id);
  }

  /**
   * Gets the source path of an arrow.
   * @param id - The dialog id.
   * @returns The source path of the arrow.
   */
  getArrowSrc(id: string) {
    if (this.isOpened(id)) {
      return '/assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '/assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  /**
   * Resets an assigned-to input.
   */
  resetAssignedTo() {
    this.close('assignedTo');
    this.search?.setValue('');
  }

  /**
   * Fades out a dialog..
   * @param fn - The next function to be called.
   */
  fadeOut(fn: () => void = () => {}) {
    this.setFadedOut(true);
    setTimeout(() => fn(), 0);
    setTimeout(() => this.setFadedOut(false), 100);
  }

  /**
   * Set fadedOut by value.
   * @param value - The value to set.
   */
  private setFadedOut(value: boolean) {
    this.fadedOut = value;
  }
}
