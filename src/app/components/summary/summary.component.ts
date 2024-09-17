import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';
import { JoinService } from '../../shared/services/join.service';
import { TaskSummary } from '../../models/task-summary';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SummaryTaskComponent, SummaryTaskInfoComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  joinData: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);

  user = new User();
  summary = new TaskSummary();

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

  async ngOnInit() {
    const userToken = await this.getUserToken();
    // const userToken = this.route.snapshot.paramMap.get('id2');
    // console.log('summary router user token: ', userToken);

    await this.getUser(userToken);
    await this.logUser();

    if (this.user.id) {
      await this.updateTaskSummary(this.user.id);
      console.log('user summary updated: ', this.user.taskSummary);
      this.getUser(this.user.id);
      console.log('updated user data: ', this.user);

      // real time data
      const unsub = onSnapshot(
        doc(this.firestore, 'users', this.user.id),
        (doc) => {
          console.log('real time data: ', doc.data());
        }
      );
    }

    // this.user = await this.joinData.users.find((u) => u.id === userToken);

    // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

    // this.user = this.joinData.currUser;
    // console.log('summary user: ', this.user);
    // console.log('summary user token: ', this.user.id);

    // const userToken = this.route.snapshot.paramMap.get('id');
    // console.log('summary user token: ', userToken);
    // if (userToken) {
    //   const newUser = await this.joinData.getUser(userToken);
    //   console.log('summary new user: ', newUser);
    // }
  }

  async getUserToken() {
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('summary router user token: ', userToken);
    return userToken;
  }

  async getUser(userToken: any) {
    let tempUser = await this.joinData.getUser(userToken);
    this.user = new User(tempUser);
    if (this.user.taskSummary) {
      this.summary = this.user.taskSummary;
      this.summaryTasks[0].amount = this.summary.toDo;
      this.summaryTasks[1].amount = this.summary.done;
      this.summaryTaskInfo[0].amount = this.summary.inBoard;
      this.summaryTaskInfo[1].amount = this.summary.inProgress;
      this.summaryTaskInfo[2].amount = this.summary.awaitingFeedback;
    }
    // if (this.user && this.user.taskSummary?.urgent) {
    //   this.user.taskSummary.urgent = 2;
    // }
    // if (this.user.id) {
    //   this.updateTaskSummary(this.user.id);
    //   console.log('user summary updated: ', this.user.taskSummary);
    // }
  }

  async logUser() {
    console.log('awaited user: ', this.user);
  }

  async updateTaskSummary(id: string) {
    const userRef = doc(this.firestore, 'users', id);
    // create updating object by summary constructor!!!
    await updateDoc(userRef, {
      TaskSummary: {
        toDo: 7,
        done: this.summary.done,
        urgent: this.summary.urgent,
        deadline: this.summary.deadline,
        inBoard: this.summary.inBoard,
        inProgress: this.summary.inProgress,
        awaitFeedback: this.summary.awaitingFeedback,
      },
    });
  }

  // user localStorage or sessionStorage to avoid reload blinking!?!
}
