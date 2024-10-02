import { Contact } from '../interfaces/contact';
import { Subtask } from '../interfaces/subtask';

export class Task {
  [key: string]: any; // to update!!!
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
    this.prio = 'medium';
    this.category = '';
    this.subtasks = [];
    this.column = 'to-do';
  }
}
