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

  // Input Components
  // ----------------
  // input [config]="config" --> short and flexible ... ?

  // Summary Component
  // -----------------
  // greetings methods ... (0/5)

  // Add-task Component
  // ------------------
  // Save user online, locally and on app level ... (2/3)
  // redirect to board ... !

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
