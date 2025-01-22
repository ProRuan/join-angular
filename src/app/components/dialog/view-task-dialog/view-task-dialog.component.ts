import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { JoinService } from '../../../shared/services/join.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Task } from '../../../shared/models/task';
import { Subtask } from '../../../shared/models/subtask';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { stop } from '../../../shared/ts/global';

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
export class ViewTaskDialogComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  task: Task = new Task();
  bgc: string = '';
  dueDate: string = '';

  prioBtn: ButtonData = {
    buttonClass: 'prio-btn',
    contClass: '',
    textClass: 'prio-btn-text',
    text: 'medium',
    imgClass: 'img-32',
    src: '/assets/img/board/prio_medium.png',
    alt: 'prio_medium',
  };

  deleteBtn: ButtonData = {
    buttonClass: 'settings-btn',
    contClass: 'w-49',
    textClass: 'settings-btn-text',
    text: 'Delete',
    imgClass: 'delete',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  editBtn: ButtonData = {
    buttonClass: 'settings-btn',
    contClass: 'w-31',
    textClass: 'settings-btn-text',
    text: 'Edit',
    imgClass: 'edit',
    src: '/assets/img/contacts/edit.png',
    alt: 'edit',
  };

  ngOnInit() {
    this.task = this.board.task;
    this.bgc = this.getBgc();
    this.dueDate = this.getDueDate();
    this.prioBtn.text = this.getPrio();
    this.prioBtn.src = this.getPrioBtnSrc();
  }

  /**
   * Provides the css class of the category backgrond-color.
   * @returns - The css class to apply.
   */
  getBgc() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  /**
   * Provides the due date.
   * @returns - The due date.
   */
  getDueDate() {
    let [year, month, day] = this.task.dueDate.split('-');
    return `${day}/${month}/${year}`;
  }

  /**
   * Provides the prio.
   * @returns - The prio.
   */
  getPrio() {
    let prio = this.task.prio.toLowerCase();
    let initial = prio[0].toUpperCase();
    return initial + prio.slice(1);
  }

  /**
   * Provides the source path of the prio button.
   * @returns - The source path of the prio button.
   */
  getPrioBtnSrc() {
    let prio = this.task.prio;
    return `/assets/img/board/prio_${prio}.png`;
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.close('viewTask');
  }

  /**
   * Checks the subtasks on click.
   * @param subtask - The subtask.
   */
  onCheck(subtask: Subtask) {
    let id = subtask.id;
    let done = !subtask.done ? true : false;
    this.task.subtasks[id].done = done;
  }

  /**
   * Deletes the task on click.
   */
  onDelete() {
    let index = this.getTaskIndex();
    if (index > -1) {
      this.deleteTask(index);
    }
  }

  deleteTask(index: number) {
    console.log('deleted task: ', index, this.join.user.tasks[index]);
    this.dialog.close('viewTask');
    this.join.user.tasks.splice(index, 1);
    // updateUser (tasks and summary)!!!
  }

  /**
   * Provides the task index.
   * @returns - The task index.
   */
  getTaskIndex() {
    let tasks = this.join.user.tasks;
    let index = tasks.indexOf(this.task);
    return index;
  }

  /**
   * Edits the task on click.
   */
  onEdit() {
    this.dialog.close('viewTask');
    this.dialog.open('editTask');
  }
}
