import { Contact } from './contact';
import { Summary } from './summary';
import { Task } from './task';

export class User {
  id?: string;
  sid?: string; // rename to sessionId?
  initials?: string;
  name: string;
  email: string;
  password: string;
  summary?: Summary; // prepare default summary!!!
  tasks?: Task[]; // prepare (5) default tasks!!!
  contacts?: Contact[]; // prepare (10) default contacts!!!

  // set optional parameter!!!
  constructor(user?: any) {
    this.id = user ? user.id : '0';
    this.sid = user ? user.sid : '0';
    this.initials = user ? user.initials : '';
    this.name = user ? user.name : 'name';
    this.email = user ? user.email : 'email';
    this.password = user ? user.password : 'password';
    this.summary = new Summary();
    this.tasks = [];
    this.contacts = [];
  }

  generateSessionId() {}

  getInitials() {}

  // id?: string;
  // sid?: string;
  // name: string;
  // email: string;
  // password: string;
  // taskSummary?: TaskSummary;
  // tasks?: Task[];
  // contacts?: Contact[];

  // constructor(user?: any) {
  //   this.id = user ? user.id : '0';
  //   this.sid = user ? user.sid : '0';
  //   this.name = user ? user.name : 'name';
  //   this.email = user ? user.email : 'email';
  //   this.password = user ? user.password : 'password';
  //   this.taskSummary = new TaskSummary();
  //   this.tasks = [new Task()];
  //   this.contacts = [new Contact()];
  // }

  // get token of logged in user
  // set user data of logged in user
  // avoid blinking
}
