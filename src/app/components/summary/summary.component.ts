import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';

// verify + rename!!!
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SummaryTaskComponent, SummaryTaskInfoComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);

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

  constructor() {}

  // jsdoc
  get user() {
    return this.join.user;
  }

  // jsdoc
  get summary() {
    if (this.user.summary) {
      return this.user.summary;
    } else {
      return new Summary();
    }
  }

  // jsdoc
  async ngOnInit() {
    await this.addSummary();
  }

  // jsdoc + necessary?
  async addSummary() {
    if (!this.user.summary) {
      this.user.summary = new Summary();
      await this.join.updateUserProperty('summary', this.user.summary);
    }
  }
}
