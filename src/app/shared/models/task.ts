import { TaskData } from '../interfaces/task-data';
import {
  getCustomArray,
  getId,
  getObjectArray,
  getString,
  isDefaultArray,
  isDefaultString,
} from '../ts/global';
import { Contact } from './contact';
import { Subtask } from './subtask';

/**
 * Class representing a task.
 */
export class Task {
  [key: string]: any;
  id: string = '';
  title: string = '';
  description: string = '';
  assignedTo: Contact[] = [];
  dueDate: string = '';
  prio: string = '';
  category: string = '';
  subtasks: Subtask[] = [];
  column: string = '';

  /**
   * Creates a task.
   * @param data - The task data.
   */
  constructor(data?: Task | TaskData) {
    this.assignValues(data);
  }

  /**
   * Assigns property values.
   * @param data - The task data.
   */
  private assignValues(data?: Task | TaskData) {
    this.id = getId(data?.id);
    this.title = getString(data?.title);
    this.description = getString(data?.description);
    this.assignedTo = getCustomArray(data?.assignedTo, Contact);
    this.dueDate = getString(data?.dueDate);
    this.prio = getString(data?.prio, 'medium');
    this.category = getString(data?.category);
    this.subtasks = getCustomArray(data?.subtasks, Subtask);
    this.column = getString(data?.column, 'to-do');
  }

  /**
   * Sets a task.
   * @param data - The task data.
   */
  set(data?: Task | TaskData) {
    this.assignValues(data);
  }

  /**
   * Gets a task as object.
   * @returns The task as object.
   */
  getObject(): TaskData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      assignedTo: getObjectArray(this.assignedTo),
      dueDate: this.dueDate,
      prio: this.prio,
      category: this.category,
      subtasks: getObjectArray(this.subtasks),
      column: this.column,
    };
  }

  /**
   * Verifies the default of a task.
   * @returns A boolean value.
   */
  isDefault() {
    let defaultProperties = this.getDefaultProperties();
    return !defaultProperties.includes(false);
  }

  /**
   * Gets default properties as boolean array.
   * @returns An boolean array.
   */
  getDefaultProperties() {
    let title = isDefaultString(this.title);
    let description = isDefaultString(this.description);
    let assignedTo = isDefaultArray(this.assignedTo);
    let dueDate = isDefaultString(this.dueDate);
    let prio = isDefaultString(this.prio, 'medium');
    let category = isDefaultString(this.category);
    let subtasks = isDefaultArray(this.subtasks);
    return [title, description, assignedTo, dueDate, prio, category, subtasks];
  }
}
