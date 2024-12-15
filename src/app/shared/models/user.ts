import { DocumentData } from 'firebase/firestore';
import { Summary } from './summary';

/**
 * Represents a user.
 */
export class User {
  initials: string;
  name: string;
  email: string;
  password: string;
  summary: Summary;

  // replace any and update files!!!
  // DocumentData | User | undefined
  // Use this way also for other models!!!
  // global getString()?!
  constructor(data?: DocumentData | User) {
    this.initials = this.getString(data?.initials);
    this.name = this.getString(data?.name);
    this.email = this.getString(data?.email);
    this.password = this.getString(data?.password);
    this.summary = this.getSummary(data?.summary);
  }

  // double coude + rename?!
  getString(value: string) {
    return value ? value : '';
  }

  // new Summary(value)?!
  getSummary(value: Summary) {
    return value ? value : new Summary();
  }
}
