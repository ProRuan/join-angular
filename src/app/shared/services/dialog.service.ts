import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a dialog service.
 */
export class DialogService {
  opened: { [key: string]: boolean } = {
    flipMenu: false,
    assignedTo: false,
    category: false,
    subtask: false,
    addTask: false,
    viewTask: false,
    editTask: false,
    deleteTask: false,
    addContact: false,
    editContact: false,
    deleteContact: false,
  };

  task: Task = new Task();
  search: AbstractControl | null = new FormControl('');

  submitted: boolean = false;
  fadedOut: boolean = false;

  id: string = 'addContact';
  title: string = '';
  subtitle: string = '';

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
   * Resets an assigned-to input value.
   */
  resetAssignedTo() {
    this.search?.setValue('');
  }
}
