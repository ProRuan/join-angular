import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinService } from './join.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  // one central task service?!

  tasks: {[key: string]: any} = {
    toDo: {
      defaultPath: './assets/img/summary/to_do.png',
      hoverPath: './assets/img/summary/to_do_hover.png',
      alt: 'to_do',
      amount: 1,
      category: 'To-do',
    },
    done: {
      defaultPath: './assets/img/summary/done.png',
      hoverPath: './assets/img/summary/done_hover.png',
      alt: 'done',
      amount: 1,
      category: 'Done',
    },
    urgent: {
      urgent: 1,
      deadline: 'October 16, 2024',
    },
    inBoard: {
      amount: 5,
      category: 'Tasks In Board',
    },
    inProgress: {
      amount: 2,
      category: 'Tasks In Progress',
    },
    awaitingFeedback: {
      amount: 2,
      category: 'Awaiting Feedback',
    },
  };

  getTask(key: string){
    return this.tasks[key];
  }
}
