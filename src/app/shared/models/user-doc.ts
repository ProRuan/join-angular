import { DocumentData } from 'firebase/firestore';
import { User } from './user';

/**
 * Class representing a user doc.
 */
export class UserDoc {
  [key: string]: any;
  data: User;
  id: string;
  sid: string;

  /**
   * Creates a user doc.
   * @param doc - The doc.
   */
  constructor(doc: DocumentData) {
    this.data = new User(doc['data']);
    this.id = doc['id'];
    this.sid = doc['sid'];
  }
}
