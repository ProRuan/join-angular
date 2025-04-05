import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { ButtonDataService } from '../../../services/button-data.service';
import { BoardService } from '../../../services/board.service';
import { Task } from '../../../models/task';
import { JoinButton } from '../../../models/join-button';
import { Subtask } from '../../../models/subtask';
import { getCapitalized, getCurrentValue } from '../../../ts/global';

@Component({
  selector: 'app-view-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CheckboxComponent,
    DeleteTaskDialogComponent,
  ],
  templateUrl: './view-task-dialog.component.html',
  styleUrl: './view-task-dialog.component.scss',
  animations: [dialogAnimation],
})

/**
 * Class representing a view-task dialog component.
 * @extends DialogFormController
 * @implements {OnChanges}
 */
export class ViewTaskDialogComponent
  extends DialogFormController
  implements OnChanges
{
  join: JoinService = inject(JoinService);
  buttons: ButtonDataService = inject(ButtonDataService);
  board: BoardService = inject(BoardService);

  @Input() task = new Task();

  prioBtn = new JoinButton();
  deleteBtn = new JoinButton('deleteBtn');
  editBtn = new JoinButton('editBtn');

  override id: string = 'viewTask';

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
    let task = getCurrentValue<Task>(changes, 'task');
    this.task.set(task);
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

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
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
  onCheck(subtask: Subtask) {
    this.checkSubtask(subtask);
    this.join.saveUser();
  }

  /**
   * Checks a subtask.
   * @param subtask - The subtask to check.
   */
  checkSubtask(subtask: Subtask) {
    let id = subtask.id;
    let done = !subtask.done;
    this.task.subtasks[id].done = done;
  }

  /**
   * Opens a delete-task dialog on click.
   */
  onDelete() {
    this.dialogs.open('deleteTask');
  }

  /**
   * Opens an edit-task dialog on click.
   */
  onEdit() {
    this.openEditTaskDialog();
  }

  /**
   * Opens an edit-task dialog.
   */
  openEditTaskDialog() {
    this.dialogs.fadedOut = true;
    this.dialogs.open('editTask');
    setTimeout(() => {
      this.dialogs.fadedOut = false;
    }, 0);
  }
}
