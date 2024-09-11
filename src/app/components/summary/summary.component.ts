import { Component } from '@angular/core';
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SummaryTaskComponent, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  summaryTasks = [
    {
      defaultPath: './assets/img/summary/to_do.png',
      hoverPath: './assets/img/summary/to_do_hover.png',
      alt: 'to_do',
      amount: 1,
      category: 'To-do',
      targeted: false,
    },
    {
      defaultPath: './assets/img/summary/done.png',
      hoverPath: './assets/img/summary/done_hover.png',
      alt: 'done',
      amount: 1,
      category: 'Done',
      targeted: false,
    },
  ];
}
