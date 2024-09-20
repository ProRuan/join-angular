import { Contact } from './contact';
import { Task } from './task';
import { TaskSummary } from './task-summary';

export class User {
  id?: string;
  sid?: string;
  name: string;
  email: string;
  password: string;
  taskSummary?: TaskSummary;
  tasks?: Task[];
  contacts?: Contact[];

  constructor(user?: any) {
    this.id = user ? user.id : '0';
    this.sid = user ? user.sid : '0';
    this.name = user ? user.name : 'name';
    this.email = user ? user.email : 'email';
    this.password = user ? user.password : 'password';
    this.taskSummary = new TaskSummary();
    this.tasks = [new Task()];
    this.contacts = [new Contact()];
  }

  // get token of logged in user
  // set user data of logged in user
  // avoid blinking
}
