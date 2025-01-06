import { DocumentData } from 'firebase/firestore';
import { Contact } from './contact';
import { Summary } from './summary';
import { Task } from './task';
import { getCustomArray, getObjectArray, getString } from '../ts/global';

/**
 * Represents a user.
 */
export class User {
  id: string;
  initials: string;
  name: string;
  email: string;
  password: string;
  summary: Summary;
  tasks: Task[];
  contacts: Contact[];

  /**
   * Creates a user.
   * @param data - The user data.
   */
  constructor(data?: DocumentData | User) {
    this.id = getString(data?.id);
    this.initials = getString(data?.initials);
    this.name = getString(data?.name);
    this.email = getString(data?.email);
    this.password = getString(data?.password);
    this.summary = this.getSummary(data?.summary);
    this.tasks = getCustomArray<Task>(data?.tasks, Task);
    this.contacts = getCustomArray<Contact>(data?.contacts, Contact);
  }

  /**
   * Provides the user summary.
   */
  getSummary(data: Summary) {
    return data ? new Summary(data) : new Summary();
  }

  /**
   * Provides the user as object.
   * @returns - The user as object.
   */
  getObject() {
    return {
      id: this.id,
      initials: this.initials,
      name: this.name,
      email: this.email,
      password: this.password,
      summary: this.summary.getObject(),
      tasks: getObjectArray<Task>(this.tasks, Task),
      contacts: getObjectArray<Contact>(this.contacts, Contact),
    };
  }
}
