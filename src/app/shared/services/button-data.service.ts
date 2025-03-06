import { Injectable } from '@angular/core';
import { ButtonData } from '../interfaces/button-data';

@Injectable({
  providedIn: 'root',
})
export class ButtonDataService {
  // improve classes and class names ...

  // JoinButton
  // ----------
  // create default button (to show the default) ... ?
  //   --> update join button default setting ... !
  // set optional class contClass ... ? (for h-25)

  // DialogComponent
  // ---------------
  // move dialogs to other folder ...
  // delete dialog component ...
  // rename this.dialog to this.dialogs ...
  // app back log or component back logs ... ?

  // View/EditTaskDialogComponent
  // ----------------------------
  // rename this.dialog.deleted to updated ... ?!
  // ViewTaskComponent and EditTaskComponent ...
  //   --> OR: AddTaskDialogComponent ...

  // improve logo animation ... !!!
  // set task-dialog animations ... (1/4)

  // update add-task menus ...
  // update view-task, edit-task, delete-task ...
  // update contact dialogs ...

  // only subscription on open?!

  // AddTaskDialogComponent
  // ----------------------
  // set transition 100ms ease-in-out ...
  // close flip-menu on click ... !

  // update/add all back logs ... !
  // fix all icons with size + object-fit ... !

  // ViewTaskDialogComponent
  // -----------------------
  // set subtask id ... !
  // view-task dialog component: check getClass() ...

  // EditTaskDialogComponent
  // -----------------------
  // complete edit-task dialog component ... !
  // fix transition: open, close, submitted ... (0/3)
  // animation by browser moduls or css ...

  // Dialog Component
  // ----------------
  // remove transit-class to app-dialog classes ... (0/4)
  // fix delete-task dialog transition (bgc/box) ...
  // verfiy dialog and dialog comp transitions ... (0/5)
  // rename stop() to stopEvent() or stopPropagation() ...
  // double style of dialogs ... (0/4)
  // double style of close button ... (0/4+)

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

  [key: string]: any;

  clearBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Clear',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  createBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Create Task',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  addTaskBtn: ButtonData = {
    buttonClass: 'create-btn slim',
    textClass: 'create-btn-text',
    text: 'Add task',
    imgClass: 'img-32',
    src: '/assets/img/board/add.png',
    alt: 'add',
  };

  deleteBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Delete',
    imgClass: 'delete',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  editBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Edit',
    imgClass: 'edit',
    src: '/assets/img/contacts/edit.png',
    alt: 'edit',
  };

  okBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Ok',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  noBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'No',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  yesBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Yes',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  addBtn: ButtonData = {
    buttonClass: 'create-btn add-new-contact-btn',
    // contClass: 'h-25',
    textClass: 'create-btn-text',
    text: 'Add new contact',
    imgClass: 'img-32',
    src: '/assets/img/contacts/add_new_contact.png',
    alt: 'add_new_contact',
  };

  deleteContactBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Delete',
    imgClass: 'delete-btn-img',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  // disabled?
  saveBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Save',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  constructor() {}
}
