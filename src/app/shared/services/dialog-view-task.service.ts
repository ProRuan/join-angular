import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogViewTaskService {
  closed: boolean = true;
  task = {
    column: 'in-progress',
    category: 'User Story',
    title: 'Kochwelt Page & Recipe Recommender',
    description: 'Build start page with recipe recommendation...',
    dueDate: '10/05/2023',
    subtaskCounter: 1,
    subtasks: 2,
    assignedContacts: [
      { bgc: '#9327ff', initials: 'AS', name: 'Anja Schulz' },
      { bgc: '#fc71ff', initials: 'DE', name: 'David Eisenberg' },
      { bgc: '#ffbb2b', initials: 'EF', name: 'Eva Fischer' },
    ],
    prio: 'medium',
  };

  constructor() {}

  set(task: any) {
    this.task = task;
  }

  open() {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }
}
