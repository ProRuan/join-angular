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
