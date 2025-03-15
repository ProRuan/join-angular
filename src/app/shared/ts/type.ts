import { ContactData } from '../interfaces/contact-data';
import { SubtaskData } from '../interfaces/subtask-data';
import { TaskData } from '../interfaces/task-data';
import { Contact } from '../models/contact';
import { Subtask } from '../models/subtask';
import { Task } from '../models/task';

export type IntervalId = ReturnType<typeof setTimeout>;

type ObjectData<T> = T extends Contact
  ? ContactData
  : T extends Subtask
  ? SubtaskData
  : T extends Task
  ? TaskData
  : never;

export type ConvertableObject<T> = {
  getObject: () => ObjectData<T>;
};
