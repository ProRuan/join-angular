import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-task',
  standalone: true,
  imports: [],
  templateUrl: './summary-task.component.html',
  styleUrl: './summary-task.component.scss',
})
export class SummaryTaskComponent {
  @Input() task = {
    defaultPath: './assets/img/summary/to_do.png',
    hoverPath: './assets/img/summary/to_do_hover.png',
    alt: 'to_do',
    amount: 1,
    category: 'To-do',
  };
  currentPath: String = this.task.defaultPath;

  set(logical: boolean) {
    this.currentPath = logical ? this.task.hoverPath : this.task.defaultPath;
  }
}
