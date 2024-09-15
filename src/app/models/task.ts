export class Task {
  title: string;
  description: string;
  assignedTo: any[]; // to change!!!
  dueDate: any; // to change!!!
  prio: string;
  category: string;
  subtasks: any[];

  constructor() {
    this.title = 'title';
    this.description = 'description';
    this.assignedTo = [];
    this.dueDate = 0;
    this.prio = 'prio';
    this.category = 'default';
    this.subtasks = [];
  }
}
