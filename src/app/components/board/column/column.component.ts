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

  @Output() currTaskChange = new EventEmitter<any>();

  ngOnInit() {
    this.id = this.name.toLowerCase().replace(' ', '-');
    this.lowercaseName = this.name.toLowerCase();
  }

  addTask() {
    this.dialog.open(this.dialogId);
  }

  moveTo(category: string) {
    this.board.currTask.column = category;
    this.currTaskChange.emit(this.board.currTask);
  }

  async drop(event: Event) {
    event.preventDefault();
    // move code to the right place!!!
    setTimeout(async () => {
      let id = this.join.user.id;
      let tasks = this.join.user.getObject().tasks;
      await this.join.updateUser(id, 'data.tasks', tasks);
      await this.join.saveUser();
    }, 0);
  }

  // consider case of column placeholder!!!
  verifyTasks(task: any, column: string) {
    let columnMatched = task.column == column;
    let titleLowerCase = task.title.toLowerCase();
    let titleMatched = titleLowerCase.includes(this.board.filter);
    let descriptionToLowerCase = task.description.toLowerCase();
    let descriptionMatched = descriptionToLowerCase.includes(this.board.filter);
    return columnMatched && (titleMatched || descriptionMatched);
  }

  printPlaceholder(column: string) {
    let tasks = this.tasks.some((t) => t.column == column);
    return !tasks ? true : false;
  }

  logDrag(event: any) {
    this.board.currTask = event;
    // this.currTaskChange.emit(this.currTask);
    // console.log('log drag: ', this.board.currTask); // in use
    // console.log('log draggable tasks: ', this.draggableTasks);
  }
}
