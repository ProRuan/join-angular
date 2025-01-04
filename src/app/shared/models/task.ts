import { getId, getItems, getString } from '../ts/global';
import { Contact } from './contact';
import { Subtask } from './subtask';

/**
 * Represents a task.
 */
export class Task {
  [key: string]: any;
  id: string;
  title: string;
  description: string;
  assignedTo: Contact[];
  dueDate: string;
  prio: string;
  category: string;
  subtasks: Subtask[];
  column: string;

  /**
   * Creates a task.
   * @param data - The task data.
   */
  constructor(data?: Task) {
    this.id = getId(data?.id);
    this.title = getString(data?.title);
    this.description = getString(data?.description);
    this.assignedTo = getItems<Contact>(data?.assignedTo);
    this.dueDate = getString(data?.dueDate);
    this.prio = getString(data?.prio, 'medium');
    this.category = getString(data?.category);
    this.subtasks = getItems<Subtask>(data?.subtasks);
    this.column = getString(data?.column, 'to-do');
  }

  /**
   * Provides the task as object.
   * @returns - The task as object.
   */
  getObject() {
    let task = { ...this };
    task.assignedTo = getItems<Contact>(this.assignedTo, Contact);
    task.subtasks = getItems<Subtask>(this.subtasks, Subtask);
    return task;
  }
}
