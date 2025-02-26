import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { JoinService } from '../../../shared/services/join.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Subtask } from '../../../shared/models/subtask';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-view-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    JoinTitleComponent,
    ButtonComponent,
    CheckboxComponent,
  ],
  templateUrl: './view-task-dialog.component.html',
  styleUrl: './view-task-dialog.component.scss',
})

/**
 * Represents a view-task dialog component.
 */
export class ViewTaskDialogComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'viewTask';

  deleteBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Delete',
    imgClass: 'delete',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  editBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Edit',
    imgClass: 'edit',
    src: '/assets/img/contacts/edit.png',
    alt: 'edit',
  };

  /**
   * Provides the task to view.
   * @returns - The task to view.
   */
  get task() {
    return this.board.task;
  }

  /**
   * Provides the due date.
   * @returns - The due date.
   */
  get dueDate() {
    return this.getDueDate();
  }

  /**
   * Provides the prio button.
   * @returns - The prio button.
   */
  get prioBtn(): ButtonData {
    return {
      buttonClass: 'prio-btn',
      textClass: 'prio-btn-text',
      text: this.getPrioText(),
      imgClass: 'img-32',
      src: this.getPrioSrc(),
      alt: 'prio_medium',
    };
  }

  /**
   * Provides the due date.
   * @returns - The due date.
   */
  getDueDate() {
    let [year, month, day] = this.task.dueDate.split('-');
    return `${day}/${month}/${year}`;
  }

  /**
   * Provides the prio text.
   * @returns - The prio text.
   */
  getPrioText() {
    let prio = this.task.prio.toLowerCase();
    if (prio) {
      let initial = prio[0].toUpperCase();
      return initial + prio.slice(1);
    } else {
      return 'undefined';
    }
  }

  /**
   * Provides the source path of the prio.
   * @returns - The source path of the prio.
   */
  getPrioSrc() {
    let prio = this.task.prio;
    return `/assets/img/board/prio_${prio}.png`;
  }

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    if (this.dialog.transparent) {
      return 'o-0';
    } else if (!this.dialog.isOpened(this.dialogId)) {
      return 'out';
    } else {
      return '';
    }
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Provides the css class of the category.
   * @returns - The css class of the category.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.closeDialog(this.dialogId);
  }

  /**
   * Checks the subtasks on click.
   * @param subtask - The subtask.
   */
  async onCheck(subtask: Subtask) {
    this.checkSubtask(subtask);
    this.join.saveUserTasks();
    this.join.saveUserLocally();
  }

  /**
   * Checks the subtask.
   * @param subtask - The subtask.
   */
  checkSubtask(subtask: Subtask) {
    let id = subtask.id;
    let done = !subtask.done ? true : false;
    this.task.subtasks[id].done = done;
  }

  /**
   * Opens the delete-task dialog on click.
   */
  async onDelete() {
    this.dialog.open('deleteTask');
  }

  /**
   * Opens the edit-task dialog on click.
   */
  onEdit() {
    this.dialog.task.set(this.board.task);
    this.dialog.dueDate = this.getDueDate();
    this.dialog.openDialog('editTask');
  }
}
