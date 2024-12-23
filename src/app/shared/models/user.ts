import { Summary } from './summary';
import { Task } from './task';
import { Contact } from './contact';
import { DocumentData } from 'firebase/firestore';
import { getArray, getString } from '../ts/global';

/**
 * Represents a user.
 */
export class User {
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
    this.initials = getString(data?.initials);
    this.name = getString(data?.name);
    this.email = getString(data?.email);
    this.password = getString(data?.password);
    this.summary = this.getSummary(data?.summary);
    this.tasks = getArray<Task>(data?.tasks);
    this.contacts = getArray<Contact>(data?.contacts);
  }

  /**
   * Provides the user summary.
   */
  getSummary(value: Summary) {
    return value ?? new Summary();
  }
}
