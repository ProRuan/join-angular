import { Contact } from './contact';
import { Subtask } from './subtask';

export interface Task {
  title: string;
  description: string;
  assignedTo: Contact[];
  dueDate: any; // to change!!!
  prio: string;
  category: string;
  subtasks?: Subtask[];
  column: string;
}
