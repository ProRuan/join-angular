import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../../shared/services/join.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Task } from '../../../shared/models/task';
import { isDefaultArray } from '../../../shared/ts/global';

@Component({
  selector: 'app-draggable-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-task.component.html',
  styleUrl: './draggable-task.component.scss',
})

/**
 * Represents a draggable-task component.
 */
export class DraggableTaskComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  // First tasks
  // -----------
  // login, sign-up, new-password control variables ...
  // set private functions: summary, add-task, board ...
  // set private functions for their children ...

  // BoardComponent
  // --------------
  // set board column body height ... !

  // Async, Await and Subscribe
  // --------------------------
  // await saveUser() necessary ... ?! (check all save functions)

  // I. Complete/move notes ...
  // III. replace error with control?.errors ...

  // Buttons
  // -------
  // update ButtonComponent ...
  // update JoinButton ...
  // update ButtonData ...
  // update ButtonDataService ...

  // AddTaskComponent
  // ----------------
  // Think about bottom padding ... !
  // review button component ... !
  // review max-width container ... !
  // delete interface Simple ... !
  // delete isTrue() ... ?!

  // SubtasksInputComponent
  // ----------------------
  // replace hint with error ...
  // replace input-hint-cont with column-4 + pos-relative ...
  // rename focussed to focused ... !
  // subtask id necessary ... ?!

  // rename dialog to dialogs ... !
  // rename stop to preventDefault() ... !

  // move subtask component code here ... ?
  // delete empty and edited subtasks ... ?

  // CategoryInputComponent
  // ----------------------
  // fix height (body overflow-y) of assigned-to list ...
  // fix focus over button ... (2x)
  // arrow button (also for assigned-to) ...

  // DueDateInputComponent
  // ---------------------
  // pattern test instead of value match ... !
  //   --> improve name formatter ... !

  // calendarDate and inputDate ... !
  // prepare a second control (control array) ... ?

  // remove input transition ... ?

  // delete old add-task input components ... !
  // delete AssignableContactComponent ... !

  // set all control types (not any) ... !
  // set validator array as optional + update components ... !

  // control?.value or get('control') for login, sign-up and so on ... ?

  // TitleInputCommponent
  // --------------------
  // delete HintComponent ... ?
  // add-task inputs double style ... ?

  @Input() task: Task = new Task();
  rotated: boolean = false;

  /**
   * Provides the amount of the done subtasks.
   * @returns - The amount of the done subtasks.
   */
  get counter() {
    return this.getCounter();
  }

  /**
   * Provides the amount of the subtasks to do.
   * @returns - The amount of the subtasks to do.
   */
  get max() {
    return this.task.subtasks.length;
  }

  /**
   * Provides the alternative text.
   * @returns - The alternative text.
   */
  get alt() {
    return this.getAlt();
  }

  /**
   * Provides the amount of the done subtasks.
   * @returns - The amount of the done subtasks.
   */
  getCounter() {
    let doneSubtasks = this.task.subtasks.filter((s) => s.done);
    return doneSubtasks.length;
  }

  /**
   * Provides the alternative text.
   * @returns - The alternative text.
   */
  getAlt() {
    return `prio_${this.task.prio}`;
  }

  /**
   * Provides the css class of the draggable task rotation.
   * @returns - The css class to apply.
   */
  getRotationClass() {
    return this.rotated ? 'rotated' : '';
  }

  /**
   * Starts the drag on dragstart.
   */
  onDragStart() {
    this.rotated = true;
    this.board.setDrag(this.task);
  }

  /**
   * Ends the drag on dragend.
   */
  onDragEnd() {
    this.rotated = false;
  }

  /**
   * Views the task on click.
   */
  onView() {
    this.board.task = this.task;
    this.dialog.setTransparency();
    this.dialog.openDialog('viewTask');
  }

  /**
   * Provides the css class of the task.
   * @returns - The css class to apply.
   */
  getTaskClass() {
    let subtasksExistent = this.areSubtasksExistent();
    return subtasksExistent ? 'column-24' : 'column-20';
  }

  /**
   * Verifies the existence of the subtasks.
   * @returns - A boolean value.
   */
  areSubtasksExistent() {
    return !isDefaultArray(this.task.subtasks);
  }

  /**
   * Provides the css class of the category.
   * @returns - The css class to apply.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Provides the style of the progress bar.
   * @returns - The style of the progress bar.
   */
  getStyle() {
    let progress = (128 / this.max) * this.counter;
    let value = Math.round(progress);
    return { width: `${value}px` };
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return `/assets/img/board/${this.alt}.png`;
  }
}
