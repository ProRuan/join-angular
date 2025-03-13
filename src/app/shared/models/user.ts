import { DocumentData } from 'firebase/firestore';
import { Contact } from './contact';
import { Summary } from './summary';
import { Task } from './task';
import { getCustomArray, getObjectArray, getString } from '../ts/global';

/**
 * Class representing a user.
 */
export class User {
  id: string = '';
  sid: string = '';
  initials: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  summary: Summary = new Summary();
  tasks: Task[] = [];
  contacts: Contact[] = [];

  /**
   * Creates a user.
   * @param data - The user data.
   */
  constructor(data?: DocumentData | User) {
    this.assignValues(data);
  }

  /**
   * Assigns property values.
   * @param data - The user data.
   */
  assignValues(data?: DocumentData | User) {
    this.id = getString(data?.id);
    this.sid = getString(data?.sid);
    this.initials = getString(data?.initials);
    this.name = getString(data?.name);
    this.email = getString(data?.email);
    this.password = getString(data?.password);
    this.summary = this.getSummary(data?.summary);
    this.tasks = getCustomArray(data?.tasks, Task);
    this.contacts = getCustomArray(data?.contacts, Contact);
  }

  /**
   * Sets a user.
   * @param data - The user data.
   */
  set(data?: DocumentData | User) {
    this.assignValues(data);
  }

  /**
   * Gets a user summary.
   * @returns The user summary.
   */
  getSummary(data: Summary) {
    return data ? new Summary(data) : new Summary();
  }

  /**
   * Gets a user as object.
   * @returns The user as object.
   */
  getObject() {
    return {
      id: this.id,
      sid: this.sid,
      initials: this.initials,
      name: this.name,
      email: this.email,
      password: this.password,
      summary: this.summary.getObject(),
      tasks: getObjectArray(this.tasks, Task),
      contacts: getObjectArray(this.contacts, Contact),
    };
  }
}
