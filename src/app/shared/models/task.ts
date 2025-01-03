import { getArray, getConvertedValues, getString, getTime } from '../ts/global';
import { Contact } from './contact';
import { Subtask } from './subtask';

/**
 * Represents a task.
 */
export class Task {
  [key: string]: any;
  id: number;
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
   * @param task - The providing task.
   */
  constructor(task?: Task) {
    this.id = getTime();
    this.title = getString(task?.title);
    this.description = getString(task?.description);
    this.assignedTo = getArray<Contact>(task?.assignedTo);
    this.dueDate = getString(task?.dueDate);
    this.prio = getString(task?.prio, 'medium');
    this.category = getString(task?.category);
    this.subtasks = getArray<Subtask>(task?.subtasks);
    this.column = getString(task?.column, 'to-do');
  }

  /**
   * Provides the task as object.
   * @returns - The task as object.
   */
  getObject() {
    let task = { ...this };
    task.assignedTo = getConvertedValues(this.assignedTo);
    task.subtasks = getConvertedValues(this.subtasks);
    return task;
  }
}
