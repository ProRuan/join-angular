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

  // LoginComponent
  // --------------

  // block 1
  // -------
  // fix email input error!

  // adapt text input hint!
  // adapt password input hint!
  // verify hint (login)!!!

  // block 2
  // -------
  // provided remember me functions!!!
  // give user feedback if no user to login (backlog)!!!

  // LoginComponent and SignUpComponent
  // ----------------------------------
  // Verifies errors of empty userDocs!!!
}
