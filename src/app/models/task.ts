import { Contact } from './contact';
import { Subtask } from './subtask';

export class Task {
  title: string;
  description: string;
  assignedTo: Contact[];
  dueDate: any; // to change!!!
  prio: string;
  category: string;
  subtasks?: Subtask[];
  column: string;

  constructor() {
    this.title = '';
    this.description = '';
    this.assignedTo = [];
    this.dueDate = '';
    this.prio = '';
    this.category = '';
    this.subtasks = [];
    this.column = 'to-do';
  }

  // title: string;
  // description: string;
  // assignedTo: any[]; // to change!!!
  // dueDate: any; // to change!!!
  // prio: string;
  // category: string;
  // subtasks: any[];

  // constructor() {
  //   this.title = 'title';
  //   this.description = 'description';
  //   this.assignedTo = [];
  //   this.dueDate = '';
  //   this.prio = 'prio';
  //   this.category = '';
  //   this.subtasks = [];
  // }
}
