import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { JoinDialog } from '../../../shared/models/join-dialog';
import { JoinService } from '../../../shared/services/join.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './delete-task-dialog.component.html',
  styleUrl: './delete-task-dialog.component.scss',
  animations: [fadeAnimation],
})

/**
 * Class representing a delete-task dialog component.
 * @extends JoinDialog
 */
export class DeleteTaskDialogComponent extends JoinDialog {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);

  noBtn = new JoinButton('noBtn');
  yesBtn = new JoinButton('yesBtn');

  override id: string = 'deleteTask';

  /**
   * Closes a dialog on click.
   */
  onClose(event: Event) {
    this.close(event);
  }

  /**
   * Deletes the task on click.
   */
  async onDelete() {
    let index = this.getTaskIndex();
    if (index > -1) {
      this.deleteTask(index);
    }
  }

  /**
   * Gets a task index.
   * @returns The task index.
   */
  getTaskIndex() {
    return this.join.user.tasks.indexOf(this.board.task);
  }

  /**
   * Deletes a task.
   * @param index - The task index.
   */
  deleteTask(index: number) {
    this.dialog.deleted = true;
    setTimeout(async () => {
      this.closesDialogs();
      this.join.deleteTask(index);
      this.summary.update();
      await this.join.saveUser();
      this.dialog.deleted = false;
    }, 0);
  }

  /**
   * Closes all open dialogs.
   */
  closesDialogs() {
    this.close();
    this.dialog.close('viewTask');
  }
}
