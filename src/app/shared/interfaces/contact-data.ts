import { Task } from '../models/task';

/**
 * Represents contact data.
 */
export interface ContactData {
  initials: string;
  bgc: string;
  name: string;
  email: string;
  phone: string;
  tasks: Task[];
}
