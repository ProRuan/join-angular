import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './delete-task-dialog.component.html',
  styleUrl: './delete-task-dialog.component.scss',
})

/**
 * Represents a delete-task dialog component.
 */
export class DeleteTaskDialogComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'deleteTask';

  noBtn: ButtonData = {
    buttonClass: 'clear-btn no-btn',
    textClass: 'clear-btn-text',
    text: 'No',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  yesBtn: ButtonData = {
    buttonClass: 'create-btn yes-btn',
    textClass: 'create-btn-text',
    text: 'Yes',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    return !this.dialog.isOpened(this.dialogId) ? 'o-0' : '';
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
  onClose(event: Event) {
    this.dialog.close(this.dialogId);
    stop(event);
  }

  /**
   * Deletes the task on click.
   */
  async onDelete() {
    let index = this.getTaskIndex();
    if (index > -1) {
      this.closeDialog();
      this.deleteTask(index);
      this.summary.update();
      await this.join.saveUser();
    }
  }

  /**
   * Provides the task index.
   * @returns - The task index.
   */
  getTaskIndex() {
    let tasks = this.join.user.tasks;
    let index = tasks.indexOf(this.board.task);
    return index;
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialog.transparent = true;
    this.dialog.close(this.dialogId);
    this.dialog.closeDialog('viewTask');
  }

  /**
   * Deletes the task.
   * @param index - The task index.
   */
  deleteTask(index: number) {
    this.join.user.tasks.splice(index, 1);
  }
}
