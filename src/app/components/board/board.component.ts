import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskSettingsDialogComponent } from '../../shared/components/dialogs/task-settings-dialog/task-settings-dialog.component';
import { AddTaskDialogComponent } from '../../shared/components/dialogs/add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from '../../shared/components/dialogs/view-task-dialog/view-task-dialog.component';
import { EditTaskDialogComponent } from '../../shared/components/dialogs/edit-task-dialog/edit-task-dialog.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BoardHeadComponent } from './board-head/board-head.component';
import { ColumnComponent } from './column/column.component';
import { JoinService } from '../../shared/services/join.service';
import { ButtonDataService } from '../../shared/services/button-data.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { JoinButton } from '../../shared/models/join-button';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskSettingsDialogComponent,
    AddTaskDialogComponent,
    ViewTaskDialogComponent,
    EditTaskDialogComponent,
    JoinTitleComponent,
    SearchInputComponent,
    ButtonComponent,
    BoardHeadComponent,
    ColumnComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})

/**
 * Class representing a board component.
 */
export class BoardComponent {
  join: JoinService = inject(JoinService);
  buttons: ButtonDataService = inject(ButtonDataService);
  board: BoardService = inject(BoardService);
  dialogs: DialogService = inject(DialogService);

  // rename boad to board head component ... ?
  // column padding 10px + board gap 6px ... !
  // fix board/column/body padding due to box-shadow ... !

  // edit-task dialog: think about height + overflow-y ...
  //   --> fix from 360px til 320px: scrollbar in empty padding ...
  // fix min-height ...

  // view-task dialog: fix prio-btn-img for desktop and mobile ...
  // fix min-height ...
  // optional: think about view-task dialog padding: 32px 16px ...

  // review onAdd() ...
  // add isMobileWidth() to join service ...

  // review draggable task box-shadow ...

  // set content max-width:428px ...
  // not selectable/touchable elements/text ... ?
  // add responsiveness for board max-height ...
  //   --> get height from top elements + bottom padding ... !

  title: string = 'Board';
  addTaskBtn = new JoinButton('addTaskBtn');

  /**
   * Gets user tasks.
   * @returns The user tasks.
   */
  get tasks() {
    return this.join.user.tasks;
  }

  /**
   * Sets user tasks.
   * @param tasks - The tasks to set.
   */
  set tasks(tasks: Task[]) {
    this.join.user.tasks = tasks;
  }

  /**
   * Initializes a board component.
   */
  ngOnInit() {
    this.join.loaded$.subscribe({
      next: (value) => this.updateHeightFactor(value),
      error: (error) => console.log('Error - Could not load user: ', error),
    });
  }

  /**
   * Updates the height factor needed to calculate a board minimum height.
   * @param loaded - A boolean value.
   */
  updateHeightFactor(loaded: boolean) {
    if (loaded) {
      this.board.setHeightFactor(this.tasks);
      this.join.loadedSubject.complete();
    }
  }

  // new
  isOpened(id: string) {
    this.dialogs.isOpened(id);
  }

  /**
   * Resets a targeted column on dragleave.
   */
  onReset() {
    this.board.targetedColumn = '';
  }

  /**
   * Opens an add-task form on click.
   */
  onAdd() {
    this.board.onAdd();
  }

  /**
   * Gets the tasks of a column.
   * @param column - The column.
   * @returns The tasks of the column.
   */
  getTasks(column: string) {
    return this.tasks.filter((t) => t.column === column);
  }
}
