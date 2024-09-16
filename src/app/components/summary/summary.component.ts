import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';
import { JoinService } from '../../shared/services/join.service';
import { TaskSummary } from '../../models/task-summary';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SummaryTaskComponent, SummaryTaskInfoComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  joinData: JoinService = inject(JoinService);

  summary: any;

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

  ngOnInit() {
    // add SummaryService!!!
    // this.summary = this.joinData.currUser.taskSummary;
    // if (this.summary) {
    //   console.log('task summary: ', this.summary);
    // }
  }
}
