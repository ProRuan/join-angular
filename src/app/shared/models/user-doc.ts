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
  // also for setLog()?!
  // double code function?!
  // global service!?!
  // add new password link to login!!!F
  // fix title!!!

  // NewPasswordComponent
  // --------------------
  // provide remember me functions ...

  // renew password via email link (php) ... ?
  // fix error on portfolio ("Here ist ...") ...

  // renew rejected (blinking) ... ?

  // change page animation (gray, 100-200ms) ... ?
}
