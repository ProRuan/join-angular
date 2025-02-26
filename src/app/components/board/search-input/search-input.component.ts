import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../../shared/models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, SearchInputComponent),
    getProvider(NG_VALUE_ACCESSOR, SearchInputComponent),
  ],
})

/**
 * Represents a search input component.
 * @extends - The BasicInput.
 */
export class SearchInputComponent extends BasicInput {
  @Input() override value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  // First tasks
  // -----------
  // login, sign-up, new-password control variables ...
  // set private functions: summary, add-task, board ...
  // set private functions for their children ...

  // BoardComponent
  // --------------
  // adjust search input for form control ... !
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
   * Updates the value on event.
   * @param delayed - A boolean value.
   */
  onUpdate(delayed: boolean = false) {
    delayed ? setTimeout(() => this.update(), 0) : this.update();
  }

  /**
   * Updates the value.
   */
  update() {
    let value = this.value.toLowerCase();
    this.valueChange.emit(value);
  }
}
