import { DocumentData } from 'firebase/firestore';
import { Contact } from './contact';
import { Summary } from './summary';
import { Task } from './task';
import { getItems, getString } from '../ts/global';

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
    this.tasks = getItems<Task>(data?.tasks);
    this.contacts = getItems<Contact>(data?.contacts);
  }

  /**
   * Provides the user summary.
   */
  getSummary(value: Summary) {
    return value ?? new Summary();
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
      // summary: this.summary, // not working
      // getItems() --> interface for constructor?
      tasks: getItems(this.tasks, Task),
      contacts: getItems(this.contacts, Contact),
    };
  }
}
