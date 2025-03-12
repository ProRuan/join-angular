import { Contact } from '../models/contact';
import { SummaryTask } from '../models/summary-task';
import { Task } from '../models/task';

/**
 * Interface representing user data.
 */
export interface UserData {
  [key: string]: any;
  data: {
    id: string;
    sid: string;
    initials: string;
    name: string;
    email: string;
    password: string;
    summary: {
      toDo: SummaryTask;
      done: SummaryTask;
      urgent: SummaryTask;
      inBoard: SummaryTask;
      inProgress: SummaryTask;
      awaitingFeedback: SummaryTask;
    };
    tasks: Task[];
    contacts: Contact[];
  };
}
