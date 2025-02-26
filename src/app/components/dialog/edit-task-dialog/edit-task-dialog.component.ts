import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TitleInputComponent } from '../../../shared/components/title-input/title-input.component';
import { DescriptionInputComponent } from '../../../shared/components/description-input/description-input.component';
import { DueDateInputComponent } from '../../../shared/components/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../../shared/components/prio-input/prio-input.component';
import { AssignedToInputComponent } from '../../../shared/components/assigned-to-input/assigned-to-input.component';
import { SubtasksInputComponent } from '../../../shared/components/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { isTrue, stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TitleInputComponent,
    DescriptionInputComponent,
    DueDateInputComponent,
    PrioInputComponent,
    AssignedToInputComponent,
    SubtasksInputComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
})

/**
 * Represents an edit-task dialog component.
 */
export class EditTaskDialogComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  // reset dialog task, dueDate, assignedTo, subtasks ... (0/4)
  // reset input values ... (0/3)
  // reset assignedTo (origin/copy) ... (0/2)

  dialogId: string = 'editTask';
  subtasks: string = ''; // move to dialog service?!

  okBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Ok',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  /**
   * Provides the task.
   * @returns - The task.
   */
  get task() {
    return this.dialog.task;
  }

  /**
   * Provides the due date.
   * @returns - The due date.
   */
  get dueDate() {
    return this.dialog.dueDate;
  }

  /**
   * Sets the due date.
   */
  set dueDate(value: string) {
    this.dialog.dueDate = value;
  }

  get search() {
    return this.dialog.search?.value;
  }

  set search(value) {
    this.dialog.search?.setValue(value);
  }

  /**
   * Provides the user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  /**
   * Provides the due date of the task.
   * @returns - The due date of the task.
   */
  getDueDate() {
    let [year, month, day] = this.task.dueDate.split('-');
    return `${day}/${month}/${year}`;
  }

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    let closed = !this.dialog.isOpened('editTask');
    if (this.dialog.animated && closed) {
      return 'out';
    } else {
      return '';
    } // on update with opacity?!
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.closeAllDialogs();
    this.board.setDefaultTask();
  }

  /**
   * Verifies the incompleteness of the form.
   * @param ngForm - The add-task form.
   * @returns - A boolean value.
   */
  isIncomplete(ngForm: NgForm) {
    return isTrue(ngForm.invalid);
  }

  /**
   * Updates the user task on click.
   * @param ngForm - The edit-task form.
   */
  async onUpdate(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.board.task.set(this.task);
      this.summary.update();
      await this.join.saveUser();
      // one method from dialog?!
      this.dialog.closeDialog(this.dialogId, true);
      this.dialog.openDialog('viewTask');
    }
  }

  // onClose(), onUpdate() ... ?
  clearForm() {
    this.search = '';
    this.dueDate = '';
    this.subtasks = '';
    // this.task = new Task();
  }
}
