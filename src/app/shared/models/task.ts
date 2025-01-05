import {
  getCustomArray,
  getId,
  getObject,
  getObjectArray,
  getString,
} from '../ts/global';
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
    this.assignedTo = getCustomArray<Contact>(data?.assignedTo, Contact);
    this.dueDate = getString(data?.dueDate);
    this.prio = getString(data?.prio, 'medium');
    this.category = getString(data?.category);
    this.subtasks = getCustomArray<Subtask>(data?.subtasks, Subtask);
    this.column = getString(data?.column, 'to-do');
  }

  /**
   * Provides the task as object.
   * @returns - The task as object.
   */
  getObject() {
    let task = <Task>getObject(this);
    task.assignedTo = getObjectArray<Contact>(this.assignedTo, Contact);
    task.subtasks = getObjectArray<Subtask>(this.subtasks, Subtask);
    return task;
  }
}
