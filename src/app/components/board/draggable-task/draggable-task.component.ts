import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-draggable-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-task.component.html',
  styleUrl: './draggable-task.component.scss',
})
export class DraggableTaskComponent {
  @Input() task: Task = new Task();
  counter: number = 0;
  max: number = 0;
  px: number = 0;
  pxString: string = '';
  width = { width: '0px' };

  // checklist
  // ---------
  // add card transition ...
  // gap without subtasks: 20px ...
  // cut to long descriptions ...
  // ---------

  // @Input() task = {
  //   category: 'User Story',
  //   title: 'Kochwelt Page & Recipe Recommender',
  //   description: 'Build start page with recipe recommendation...',
  //   subtaskCounter: 1,
  //   subtasks: 2,
  //   assignedContacts: [
  //     { bgc: '#9327ff', initials: 'AS' },
  //     { bgc: '#fc71ff', initials: 'DE' },
  //     { bgc: '#ffbb2b', initials: 'EF' },
  //   ],
  //   prio: 'medium',
  // };
  rotated: boolean = false;

  @Output() dragMove = new EventEmitter<any>();
  @Output() viewStart = new EventEmitter<any>();

  ngOnInit() {
    // 128 / 2 = 64px
    // 128 / n = apx
    for (let i = 0; i < this.task.subtasks.length - 1; i++) {
      let subtask = this.task.subtasks[i];
      subtask.done = true;
    }
    let doneSubtasks = this.task.subtasks.filter((s) => s.done);
    if (doneSubtasks) {
      this.counter = doneSubtasks.length;
    }
    this.max = this.task.subtasks.length;
    console.log('counter und max: ', this.counter, this.max);
    this.px = (128 / this.max) * this.counter;
    this.pxString = this.px + 'px';
    this.width = { width: this.pxString };
    console.log('px: ', this.px, this.pxString, this.width);
  }

  onDragMove() {
    this.rotated = true;
    this.dragMove.emit(this.task);
    // console.log('on drag move: ', this.task); // in use
  }

  color() {
    let color = this.task.category.toLowerCase();
    return color.replace(' ', '-');
  }

  onViewStart() {
    this.rotated = true;
    this.viewStart.emit(this.task);
    console.log('on view start: ', this.task);
  }
}
