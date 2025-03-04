import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a dialog service.
 */
export class DialogService {
  ids: string[] = ['addTask', 'viewTask', 'editTask'];

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

  currDialog: string = '';
  dialogOpened: boolean = false;
  animated: boolean = false; // rename?!
  transparent: boolean = false;

  task: Task = new Task();
  search: AbstractControl | null = new FormControl('');

  // just id?!
  dialogId: string = 'addContact';
  title: string = '';
  subtitle: string = '';

  submitted: boolean = false;
  deleted: boolean = false;

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
    this.search?.setValue('');
  }

  onOpenDialog(id: string) {
    this.closeAllDialogs();
    this.openDialog(id);
  }

  closeAllDialogs() {
    this.ids.forEach((id) => {
      this.closeDialog(id);
    });
  }

  // use optional logical parameter!!!
  closeDialog(id: string, opened: boolean = false) {
    if (this.isOpened(id)) {
      if (id == 'editTask') {
        this.animated = true;
      }
      this.close(id);
      this.dialogOpened = opened;
      // animate edit-task dialong on close and on closeAll ... (0/2)
      // if (id == 'editTask') {
      //   this.currDialog = '';
      // }
    }
  }

  // use this or the upper method?!
  openDialog(id: string) {
    this.currDialog = id;
    if (id == 'editTask' && this.animated == true) {
      this.animated = false;
    }
    setTimeout(() => {
      if (!this.dialogOpened) {
        this.dialogOpened = true;
      }
      this.open(id);
      console.log('openend', this.opened);
    }, 0);
  }

  setTransparency(value?: boolean) {
    if (value) {
      this.transparent = value;
    } else if (this.transparent) {
      this.transparent = false;
    }
  }
}
