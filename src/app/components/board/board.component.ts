import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColumnComponent } from './column/column.component';
import { JoinService } from '../../shared/services/join.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { ButtonData } from '../../shared/interfaces/button-data';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    SearchInputComponent,
    ButtonComponent,
    ColumnComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})

/**
 * Represents a board component.
 */
export class BoardComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  // First tasks
  // -----------
  // login, sign-up, new-password control variables ...

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

  title: string = 'Board';

  addTaskBtn: ButtonData = {
    buttonClass: 'create-btn slim',
    textClass: 'create-btn-text',
    text: 'Add task',
    imgClass: 'img-32',
    src: '/assets/img/board/add.png',
    alt: 'add',
  };

  /**
   * Provides the user tasks.
   */
  get tasks() {
    return this.join.user.tasks;
  }

  /**
   * Sets the user tasks.
   */
  set tasks(tasks: Task[]) {
    this.join.user.tasks = tasks;
  }

  /**
   * Resets the targeted column on dragleave.
   */
  onResetTarget() {
    this.board.targetedColumn = '';
  }

  /**
   * Opens the add-task dialog on click.
   */
  onAddTask() {
    this.dialog.openDialog('addTask');
  }

  /**
   * Provides the tasks of the column.
   * @param column - The column.
   * @returns - The tasks of the column.
   */
  getTasks(column: string) {
    return this.tasks.filter((t) => t.column == column);
  }
}
