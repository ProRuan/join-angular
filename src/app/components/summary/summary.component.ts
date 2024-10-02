import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

// verify!!!
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { MainComponent } from '../main/main.component';
import { User } from '../../shared/models/user';
import { JoinService } from '../../shared/services/join.service';

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

  // verify!!!
  mainComponent: MainComponent = inject(MainComponent);

  sid: any;
  user = new User();
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
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.join.user;
    console.log('from main user: ', this.mainComponent.join.user);

    if (!this.mainComponent.join.user.summary) {
      this.mainComponent.join.user.summary = {
        toDo: 0,
        done: 0,
        urgent: 0,
        deadline: 'October 12, 2024',
        inBoard: 0,
        inProgress: 0,
        awaitFeedback: 0,
      };
    }
    this.summary = this.mainComponent.join.user.summary;
  }
}
