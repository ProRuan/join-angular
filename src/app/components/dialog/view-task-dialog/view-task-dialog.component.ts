import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { JoinDialog } from '../../../shared/models/join-dialog';
import { JoinService } from '../../../shared/services/join.service';
import { ButtonDataService } from '../../../shared/services/button-data.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { Task } from '../../../shared/models/task';
import { JoinButton } from '../../../shared/models/join-button';
import { Subtask } from '../../../shared/models/subtask';
import { getCapitalized } from '../../../shared/ts/global';

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
 * Class representing a view-task dialog component.
 * @extends JoinDialog
 */
export class ViewTaskDialogComponent extends JoinDialog implements OnChanges {
  join: JoinService = inject(JoinService);
  buttons: ButtonDataService = inject(ButtonDataService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);

  // improve logo animation ... !!!
  // set task-dialog animations ... (1/4)

  // update add-task menus ...
  // update view-task, edit-task, delete-task ...
  // update contact dialogs ...

  // only subscription on open?!

  // AddTaskDialogComponent
  // ----------------------
  // set transition 100ms ease-in-out ...
  // close flip-menu on click ... !

  // update/add all back logs ... !
  // fix all icons with size + object-fit ... !

  override id: string = 'viewTask';

  deleteBtn = new JoinButton('deleteBtn');
  editBtn = new JoinButton('editBtn');

  @Input() task = new Task();
  prioBtn = new JoinButton();

  /**
   * Updates a view-task dialog component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.updateTask(changes);
    this.updatePrioBtn();
  }

  /**
   * Updates a task.
   * @param changes - The changes.
   */
  updateTask(changes: SimpleChanges) {
    let value = changes['task'].currentValue;
    this.task.set(value);
  }

  /**
   * Updates a prio button.
   */
  updatePrioBtn() {
    let data = this.getPrioBtnData();
    this.prioBtn.set(data);
  }

  /**
   * Gets prio button data.
   * @returns The prio button data.
   */
  getPrioBtnData() {
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
   * Gets a prio text.
   * @returns The prio text.
   */
  getPrioText() {
    let prio = this.task.prio.toLowerCase();
    return prio ? getCapitalized(prio) : 'undefined';
  }

  /**
   * Gets the source path of a prio.
   * @returns The source path of the prio.
   */
  getPrioSrc() {
    let prio = this.task.prio;
    return `/assets/img/board/prio_${prio}.png`;
  }

  onClose() {
    this.close();
  }

  // check this!!!
  getClass() {
    if (this.dialog.transparent) {
      return 'o-0';
    } else if (!this.dialog.isOpened(this.id)) {
      return 'out';
    } else {
      return '';
    }
  }

  /**
   * Gets the css class of a category.
   * @returns The css class of the category.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Checks a subtask on click.
   * @param subtask - The subtask to check.
   */
  async onCheck(subtask: Subtask) {
    this.checkSubtask(subtask);
    this.join.saveUserTasks();
    this.join.saveUserLocally();
  }

  /**
   * Checks a subtask.
   * @param subtask - The subtask to check.
   */
  checkSubtask(subtask: Subtask) {
    let id = subtask.id;
    let done = !subtask.done ? true : false;
    this.task.subtasks[id].done = done;
  }

  /**
   * Opens a delete-task dialog on click.
   */
  async onDelete() {
    this.dialog.open('deleteTask');
  }

  /**
   * Opens an edit-task dialog on click.
   */
  onEdit() {
    this.dialog.task.set(this.board.task);
    this.dialog.openDialog('editTask');
  }
}
