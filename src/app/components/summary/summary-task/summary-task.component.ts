import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-task',
  standalone: true,
  imports: [],
  templateUrl: './summary-task.component.html',
  styleUrl: './summary-task.component.scss',
})
export class SummaryTaskComponent {
  @Input() summaryTask = {
    defaultPath: './assets/img/summary/to_do.png',
    hoverPath: './assets/img/summary/to_do_hover.png',
    alt: 'to_do',
    amount: 1,
    category: 'To-do',
    targeted: false,
  };

  getPath() {
    let task = this.summaryTask;
    return task.targeted ? task.hoverPath : task.defaultPath;
  }
}
