import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';
import { User } from '../../shared/models/user';

// verify (above)!!!
import { SumATaskComponent } from './sum-a-task/sum-a-task.component';
import { SumBTaskComponent } from './sum-b-task/sum-b-task.component';
import { SumCTaskComponent } from './sum-c-task/sum-c-task.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    SumATaskComponent,
    SumBTaskComponent,
    SumCTaskComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);

  aTasks = [
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

  bTask = {
    urgent: 1,
    deadline: 'October 16, 2024',
  };

  cTasks = [
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

  // create one task component with optional parameters!?

  // user localStorage or sessionStorage to avoid reload blinking!?!
  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  constructor() {}

  get user() {
    return this.join.user;
  }

  ngOnInit() {
    if (this.join.user.email !== undefined) {
      console.log('summary user: ', this.join.user);
    }
  }

  // remove or reactivate!!!
  // -----------------------
  // // jsdoc
  // get user() {
  //   return this.join.user;
  // }

  // // jsdoc
  // get summary() {
  //   if (this.user.summary) {
  //     return this.user.summary;
  //   } else {
  //     return new Summary();
  //   }
  // }

  // // jsdoc
  // async ngOnInit() {
  //   await this.addSummary();
  // }

  // // jsdoc + necessary?
  // async addSummary() {
  //   if (!this.user.summary) {
  //     this.user.summary = new Summary();
  //     await this.join.updateUserProperty('summary', this.user.summary);
  //   }
  // }
}
