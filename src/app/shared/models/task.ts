import {
  getCustomArray,
  getId,
  getObject,
  getObjectArray,
  getString,
  isDefaultArray,
  isDefaultString,
} from '../ts/global';
import { Contact } from './contact';
import { Subtask } from './subtask';

/**
 * Represents a task.
 */
export class Task {
  [key: string]: any;
  id!: string;
  title!: string;
  description!: string;
  assignedTo!: Contact[];
  dueDate!: string;
  prio!: string;
  category!: string;
  subtasks!: Subtask[];
  column!: string;

  /**
   * Creates a task.
   * @param data - The task data.
   */
  constructor(data?: Task) {
    this.assignValues(data);
  }

  /**
   * Assigns the property values.
   * @param data - The task data.
   */
  private assignValues(data?: Task) {
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
   * Sets the task data.
   * @param data - The task data.
   */
  set(data?: Task) {
    this.assignValues(data);
  }

  /**
   * Provides the task as object.
   * @returns - The task as object.
   */
  getObject() {
    let task = getObject<Task>(this);
    task.assignedTo = getObjectArray(this.assignedTo, Contact);
    task.subtasks = getObjectArray(this.subtasks, Subtask);
    return task;
  }

  /**
   * Verifies the default of a task.
   * @returns - A boolean value.
   */
  isDefault() {
    let defaultProperties = this.getDefaultProperties();
    return !defaultProperties.includes(false);
  }

  /**
   * Provides the default properties as boolean array.
   * @returns - An boolean array.
   */
  getDefaultProperties() {
    let title = isDefaultString(this.title);
    let description = isDefaultString(this.description);
    let assignedTo = isDefaultArray<Contact>(this.assignedTo);
    let dueDate = isDefaultString(this.dueDate);
    let prio = isDefaultString(this.prio, 'medium');
    let category = isDefaultString(this.category);
    let subtasks = isDefaultArray<Subtask>(this.subtasks);
    return [title, description, assignedTo, dueDate, prio, category, subtasks];
  }
}
