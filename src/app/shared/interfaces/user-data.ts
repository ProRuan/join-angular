import { ContactData } from './contact-data';
import { SummaryData } from './summary-data';
import { TaskData } from './task-data';

/**
 * Interface representing user data.
 */
export interface UserData {
  id: string;
  initials: string;
  name: string;
  email: string;
  password: string;
  summary: SummaryData;
  tasks: TaskData[];
  contacts: ContactData[];
}
