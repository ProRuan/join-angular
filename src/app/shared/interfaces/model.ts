import { Contact } from '../models/contact';
import { Subtask } from '../models/subtask';
import { Task } from '../models/task';
import { ContactData } from './contact-data';
import { SubtaskData } from './subtask-data';
import { TaskData } from './task-data';

type ModelConstructor<T> = T extends ContactData
  ? Contact
  : T extends SubtaskData
  ? Subtask
  : T extends TaskData
  ? Task
  : T;

/**
 * Interface representing a model.
 */
export interface Model<T> {
  new (item: T): ModelConstructor<T>;
}
