export interface TaskData {
  // edit assignedTo and subtasks ... !
  // add summary of user data ... ?
  // update sign-up ...
  // update check.txt ...
  id: string;
  title: string;
  description: string;
  assignedTo: {
    id: string;
    initials: string;
    bgc: string;
    name: string;
    email: string;
    phone: string;
  }[];
  dueDate: string;
  prio: string;
  category: string;
  subtasks: {
    id: number;
    text: string;
    done: boolean;
    focussed: boolean;
  }[];
  column: string;
}
