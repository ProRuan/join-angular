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

  // NewPasswordComponent
  // --------------------
  // provided remember me functions!!!
}
