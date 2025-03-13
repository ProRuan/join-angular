import { ContactData } from './contact-data';
import { SubtaskData } from './subtask-data';

/**
 * Interface representing task data.
 */
export interface TaskData {
  id: string;
  title: string;
  description: string;
  assignedTo: ContactData[];
  dueDate: string;
  prio: string;
  category: string;
  subtasks: SubtaskData[];
  column: string;
}
