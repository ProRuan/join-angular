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
 * Class representing a draggable-task component.
 */
export class DraggableTaskComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  @Input() task: Task = new Task();
  rotated: boolean = false;

  /**
   * Gets an amount of done subtasks.
   * @returns The amount of done subtasks.
   */
  get counter() {
    return this.task.subtasks.filter((s) => s.done).length;
  }

  /**
   * Gets a maximum amount of subtasks to do.
   * @returns The maximum amount of subtasks to do.
   */
  get max() {
    return this.task.subtasks.length;
  }

  /**
   * Gets an alternative text.
   * @returns The alternative text.
   */
  get alt() {
    return `prio_${this.task.prio}`;
  }

  /**
   * Gets the css class of a draggable task rotation.
   * @returns The css class of the draggable task rotation.
   */
  getRotationClass() {
    return this.rotated ? 'rotated' : '';
  }

  /**
   * Starts a drag on dragstart.
   */
  onDragStart() {
    this.rotated = true;
    this.board.setDrag(this.task);
  }

  /**
   * Ends a drag on dragend.
   */
  onDragEnd() {
    this.rotated = false;
  }

  /**
   * Views a task on click.
   */
  onView() {
    this.board.task = this.task;
    this.dialog.setTransparency();
    this.dialog.openDialog('viewTask');
  }

  /**
   * Gets the css class of a task.
   * @returns The css class of the task.
   */
  getTaskClass() {
    let subtasksExistent = this.areSubtasksExistent();
    return subtasksExistent ? 'column-24' : 'column-20';
  }

  /**
   * Verifies the existence of subtasks.
   * @returns A boolean value.
   */
  areSubtasksExistent() {
    return !isDefaultArray(this.task.subtasks);
  }

  /**
   * Gets the css class of a category.
   * @returns The css class of the category.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Gets the style of a progress bar.
   * @returns The style of the progress bar.
   */
  getStyle() {
    let progress = (128 / this.max) * this.counter;
    let value = Math.round(progress);
    return { width: `${value}px` };
  }

  /**
   * Gets a source path.
   * @returns The source path.
   */
  getSrc() {
    return `/assets/img/board/${this.alt}.png`;
  }
}
