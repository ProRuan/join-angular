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

  // NewPasswordComponent - Block 0
  // --------------------
  // move log texts from comp to service!!!
  // add new password link to login!!!

  // NewPasswordComponent - Block 1
  // --------------------
  // provide remember me functions ...
  // renew rejected (blinking) ... ?
  // change page animation (gray, 100-200ms) ... ?

  // fix error on portfolio ("Here ist ...") ...
}
