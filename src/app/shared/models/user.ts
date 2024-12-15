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
  constructor(data: any) {
    this.initials = data.initials;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.summary = new Summary(); // or from data?!?
  }
}
