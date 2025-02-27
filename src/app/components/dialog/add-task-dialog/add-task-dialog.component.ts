import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})

/**
 * Represents an add-task dialog component.
 */
export class AddTaskDialogComponent {
  dialog: DialogService = inject(DialogService);

  // First tasks
  // -----------
  // login, sign-up, new-password control variables ...
  // set private functions: summary, add-task, board ...
  // set private functions for their children ...

  // BoardComponent
  // --------------
  // style column-4/20/24 ... ?
  // set board column body height ... !

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

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    return !this.dialog.isOpened('addTask') ? 'out' : '';
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
    this.dialog.closeDialog('addTask');
  }
}
