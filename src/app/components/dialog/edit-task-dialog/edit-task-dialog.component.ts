import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { isTrue, stop } from '../../../shared/ts/global';
import { DialogService } from '../../../shared/services/dialog.service';
import { TitleInputComponent } from '../../../shared/components/title-input/title-input.component';
import { DescriptionInputComponent } from '../../../shared/components/description-input/description-input.component';
import { DueDateInputComponent } from '../../../shared/components/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../../shared/components/prio-input/prio-input.component';
import { AssignedToInputComponent } from '../../../shared/components/assigned-to-input/assigned-to-input.component';
import { SubtasksInputComponent } from '../../../shared/components/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinService } from '../../../shared/services/join.service';
import { Task } from '../../../shared/models/task';
import { SummaryService } from '../../../shared/services/summary.service';
import { Contact } from '../../../shared/models/contact';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { BoardService } from '../../../shared/services/board.service';

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
export class EditTaskDialogComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  // isComplete() ... ?
  // onOk(), onSave() ...
  // fill form for editing ... !
  // fix style (width) ... !
  // init dueDate ... !
  // viewTask: save after delete ... !
  // empty board task on close and/or ok ... !
  // no upcoming deadlines in the past ... ?
  // viewTask and editTask visibility and transition ... (0/2)
  // highlight assinged contacts ... !

  dialogId: string = 'editTask';
  dueDate: string = '';
  subtasks: string = '';

  // edit!!!
  createBtn: ButtonData = {
    buttonClass: 'create-btn',
    contClass: 'cont-29',
    textClass: 'create-btn-text',
    text: 'Ok',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  get task() {
    return this.board.task;
  }

  set task(task: Task) {
    this.board.task = task;
  }

  get assignedTo() {
    return this.dialog.assignedTo;
  }

  set assignedTo(value) {
    this.dialog.assignedTo = value;
  }

  get contacts() {
    return this.join.user.contacts;
  }

  ngOnInit() {
    this.dueDate = this.getDueDate();
  }

  /**
   * Provides the due date.
   * @returns - The due date.
   */
  getDueDate() {
    let [year, month, day] = this.task.dueDate.split('-');
    return `${day}/${month}/${year}`;
  }

  onStop(event: Event) {
    stop(event);
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.close(this.dialogId);
  }

  /**
   * Verifies the incompleteness of the form.
   * @param ngForm - The add-task form.
   * @returns - A boolean value.
   */
  isIncomplete(ngForm: NgForm) {
    return isTrue(ngForm.invalid);
  }

  async onUpdate(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.summary.update();
      await this.join.saveUser();
      this.dialog.close(this.dialogId);
      // this.board.resetTask();
      this.board.task = this.board.defaultTask;
    }
  }

  clearForm() {
    this.assignedTo = '';
    this.dueDate = '';
    this.subtasks = '';
    // this.task = new Task();
  }
}
