import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
 * Represents a draggable task component.
 */
export class DraggableTaskComponent {
  @Input() task: Task = new Task();
  counter: number = 0;
  max: number = 0;
  progress = { width: '0px' };
  alt: string = 'prio_medium';

  // checklist
  // ---------
  // global classes 'user-story' and 'technical-task' ...

  // <div class="draggable-task" draggable="true"
  // (dragstart)="onDragMove()" (click)="onViewStart()">

  // add task (card) transition ...
  // cut to long descriptions ...
  // ---------

  // verify!!!
  rotated: boolean = false;

  @Output() dragMove = new EventEmitter<any>();
  @Output() viewStart = new EventEmitter<any>();

  ngOnInit() {
    // only for testing!!!
    for (let i = 0; i < this.task.subtasks.length - 1; i++) {
      let subtask = this.task.subtasks[i];
      subtask.done = true;
    }

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
    let value = (128 / this.max) * this.counter;
    let width = value + 'px';
    return { width: width };
  }

  /**
   * Provides the alternative text.
   * @returns - The alternative text.
   */
  getAlt() {
    return `prio_${this.task.prio}`;
  }

  onDragMove() {
    this.rotated = true;
    this.dragMove.emit(this.task);
    // console.log('on drag move: ', this.task); // in use
  }

  /**
   * Provides the css class of the task.
   * @returns - The css class to apply.
   */
  getTaskClass() {
    let subtasks = this.task.subtasks;
    return subtasks.length > 0 ? 'column-24' : 'column-20';
  }

  /**
   * Provides the css class of the category.
   * @returns - The css class to apply.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Verifies the existence of subtasks.
   * @returns - A boolean value.
   */
  areSubtasksExistent() {
    return !isDefaultArray(this.task.subtasks);
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return `/assets/img/board/${this.alt}.png`;
  }

  // verify!!!
  onViewStart() {
    this.rotated = true;
    this.viewStart.emit(this.task);
    console.log('on view start: ', this.task);
  }
}
