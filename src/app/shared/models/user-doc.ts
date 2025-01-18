import { DocumentData } from 'firebase/firestore';
import { User } from './user';

export class UserDoc {
  [key: string]: any;
  data: User;
  id: string;
  sid: string;

  // replace any type!!!
  constructor(doc: DocumentData) {
    this.data = new User(doc['data']);
    this.id = doc['id'];
    this.sid = doc['sid'];
  }

  // App/Main Component
  // ------------------
  // load and subscribe user only one time ... !
  // work only with online date from http request ... !

  // Menu Component
  // --------------
  // fix current link after reload ... !

  // Input Components
  // ----------------
  // input [config]="config" --> short and flexible ... ?
  // onFocus and onBlur OR onFocusChange: verfiy event type?!F

  // Summary Component
  // -----------------
  // greetings methods ... (0/5)

  // Add-task Component
  // ------------------
  // think about create-btn validation: title, due date, category ... (2/3)
  //   --> add DueDateService (AddTaskService) ... !
  // set transition of all inputs (especially drop-down menu)!!!!
  // move add-task inputs to add-task ... !
  // Save user online, locally and on app level ... (2/3)
  // redirect to board ... !
  // title-button-cont with gap 30-100px ... ?!

  // SubtasksInputComponent
  // ----------------------
  // set subtask cont height limit ...
  //   --> set fix height for join app ... ?

  // Board Component
  // ---------------
  // I. dialog add-task ...
  // II. dialog view-task ...
  // III. dialog edit-task ...
  // check dialog-add-task + rename ... ?
  // rename draggable task to drag card ... ?
  // create 5 sample tasks ... !

  // Column Component
  // ----------------
  // check onUpdateTask() --> summary (in-progress, await-feedback) ... !!!
  //   --> match summary, task and column ids ... (0/3)

  // Draggable-Task Component
  // ------------------------
  // add onViewTask method ... !
  // global classes 'user-story' and 'technical-task' ...
  // cut to long descriptions ...

  // subtasks test (only for testing)
  // -------------
  //  for (let i = 0; i < this.task.subtasks.length - 1; i++) {
  //   let subtask = this.task.subtasks[i];
  //   subtask.done = true;
  // }
  // ---------

  // Routing
  // -------
  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  // Logout
  // ------
  // LogoutComponent --> Logout via JoinHeaderComponent!!!
  // save user summary at local storage (until log out)!!!

  // Summary Component
  // -----------------
  // local input styles (collision)!!!
  // improve subscribe user!!!
  // use global subscription?!
  // touch event for soft keyboard?

  // SummaryComponent and CO
  // -----------------------
  // fix main dialogs (only if match with component)!!!
  // user lost on reload!!! (local storage?!)

  // NewPasswordComponent - Block 0
  // --------------------
  // avoid user any type!!!
  // subscribe user for board!!!

  // --------------------------------------
  // I. Add privady policy and imprint ...
  // II. Make it public ...
  // III. Make a placeholder component ...
  // --------------------------------------

  // move log texts from comp to service!!!

  // NewPasswordComponent - Block 1
  // --------------------
  // renew rejected (blinking) ... ?

  // ---------------------------------------------------------

  // Task for later
  // --------------
  // fix input length login/sign-up/new password!!!
  // sign-up with overflow-y
  //      --> think about height ... !

  // fix guest login ...
  // create guest user (database) ...

  // global ngOnInit() --> unlock submit button ...

  // change page animation (gray, 100-200ms) ... ?

  // fix error on portfolio ("Here ist ...") ...
}
