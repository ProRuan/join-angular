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
  // adapt text input hint?!
  // adapt password input hint?!
  //   --> if input valid then error off?
  // apply submit error for sign-up?

  // block 2
  // -------
  // provided remember me functions!!!

  // block 3
  // -------
  // input border color transition?!
}
