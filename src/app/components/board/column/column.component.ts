import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DraggableTaskComponent } from '../draggable-task/draggable-task.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { BoardService } from '../../../shared/services/board.service';
import { Task } from '../../../shared/models/task';
import { JoinService } from '../../../shared/services/join.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DraggableTaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);
  board: BoardService = inject(BoardService);

  // board-task gap 20px
  // board-task with subtasks gap 24px
  // create 2-4 components!!!

  // also in board?!
  dialogId: string = 'addTask';

  // testing!!!
  // ----------
  id: string = '';
  lowercaseName: string = '';
  @Input() name: string = 'To do';
  @Input() tasks: Task[] = [];
  // ----------

  ngOnInit() {
    // console.log('tasks: ', this.tasks.length);

    this.id = this.name.toLowerCase().replace(' ', '-');
    this.lowercaseName = this.name.toLowerCase();

    // console.log('column: ', this.name, this.lowercaseName, this.id);
  }

  addTask() {
    this.dialog.open(this.dialogId);
  }

  async moveTo(category: string) {
    this.board.draggedTask.column = category;
    this.board.setDrag();

    // activate!
    // ---------
    // this.summary.update(); // update summary!!!
    // let id = this.join.user.id;
    // let tasks = this.join.user.getObject().tasks;
    // await this.join.updateUser(id, 'data.tasks', tasks);
    // await this.join.saveUser();
    // console.log('saved');
  }

  async onDragover(event: Event) {
    event.preventDefault();
    // move code to the right place!!!
    // setTimeout(async () => {
    //   let id = this.join.user.id;
    //   let tasks = this.join.user.getObject().tasks;
    //   await this.join.updateUser(id, 'data.tasks', tasks);
    //   await this.join.saveUser();
    // }, 0);
  }

  // consider case of column placeholder!!!
  verifyTasks(task: any) {
    let titleLowerCase = task.title.toLowerCase();
    let titleMatched = titleLowerCase.includes(this.board.filter);
    let descriptionToLowerCase = task.description.toLowerCase();
    let descriptionMatched = descriptionToLowerCase.includes(this.board.filter);
    return titleMatched || descriptionMatched;
  }

  printPlaceholder(column: string) {
    let tasks = this.tasks.some((t) => t.column == column);
    return !tasks ? true : false;
  }

  onBgc() {
    this.board.targetedColumn = this.id;
    console.log('hovered column: ', this.id);
  }

  // rename!!!
  isTargeted() {
    let dragStarted = this.board.dragStarted;
    let included = this.board.neighborColumns.includes(this.id);
    return dragStarted && included;
  }

  getBgcClass() {
    return this.board.targetedColumn == this.id ? 'bgc' : '';
  }
}
