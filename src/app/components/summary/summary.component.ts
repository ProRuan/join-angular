import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

// verify!!!
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';
import { User } from '../../shared/models/user';
import { JoinService } from '../../shared/services/join.service';
import { UserService } from '../../shared/services/user.service';
import { Summary } from '../../shared/models/summary';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SummaryTaskComponent, SummaryTaskInfoComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  // rename summary components!!!
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  user: UserService = inject(UserService);

  // verify!!!
  sid: any;
  users: User[] = [];
  summary: any;
  // summary = new Task();

  // create one task component with optional parameters!?
  summaryTasks = [
    {
      defaultPath: './assets/img/summary/to_do.png',
      hoverPath: './assets/img/summary/to_do_hover.png',
      alt: 'to_do',
      amount: 1,
      category: 'To-do',
    },
    {
      defaultPath: './assets/img/summary/done.png',
      hoverPath: './assets/img/summary/done_hover.png',
      alt: 'done',
      amount: 1,
      category: 'Done',
    },
  ];

  summaryTaskInfo = [
    {
      amount: 5,
      category: 'Tasks In Board',
    },
    {
      amount: 2,
      category: 'Tasks In Progress',
    },
    {
      amount: 2,
      category: 'Awaiting Feedback',
    },
  ];

  // user localStorage or sessionStorage to avoid reload blinking!?!
  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  constructor() {
    this.summary = {
      toDo: 0,
      done: 0,
      urgent: 0,
      deadline: 'October 12, 2024',
      inBoard: 0,
      inProgress: 0,
      awaitFeedback: 0,
    };
  }

  async ngOnInit() {
    console.log('got sid via main: ', this.join.sid);
    console.log('got user via main', this.join.user);
    console.log('got user via service: ', this.user);

    // add summary service: user.summary.done --> summary.done
    if (!this.user.summary) {
      this.user.summary = new Summary();
      await this.join.updateUserProperty('summary', this.user.summary);
      console.log('added user summary: ', this.user.summary);
    }
    this.summary = this.user.summary;
  }
}
