import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../../shared/services/join.service';
import { BoardService } from '../../../shared/services/board.service';
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

  @Input() task: Task = new Task();
  counter: number = 0;
  max: number = 0;
  progress = { width: '0px' };
  alt: string = 'prio_medium';
  rotated: boolean = false;

  /**
   * Initializes a draggable-task component.
   */
  ngOnInit() {
    this.counter = this.getCounter();
    this.max = this.getMax();
    this.progress = this.getProgress();
    this.alt = this.getAlt();
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
   * Provides the maximum of the progress bar.
   * @returns - The maximum of the progress bar.
   */
  getMax() {
    return this.task.subtasks.length;
  }

  /**
   * Provides the progress of the subtasks.
   * @returns - The progress of the subtasks.
   */
  getProgress() {
    let progress = (128 / this.max) * this.counter;
    let value = Math.round(progress);
    return { width: `${value}px` };
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
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return `/assets/img/board/${this.alt}.png`;
  }
}
