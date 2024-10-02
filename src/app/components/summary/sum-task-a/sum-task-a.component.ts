import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-task-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-task-a.component.html',
  styleUrl: './sum-task-a.component.scss',
})
export class SumTaskAComponent {
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
