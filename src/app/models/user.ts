import { Contact } from './contact';
import { Task } from './task';
import { TaskSummary } from './task-summary';

export class User {
  name: string;
  email: string;
  password: string;
  taskSummary: TaskSummary;
  tasks: Task[];
  contacts: Contact[];

  constructor() {
    this.name = 'name';
    this.email = 'email';
    this.password = 'password';
    this.taskSummary = new TaskSummary();
    this.tasks = [new Task()];
    this.contacts = [new Contact()];
  }
}
