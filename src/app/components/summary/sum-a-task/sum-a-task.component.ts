import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-a-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-a-task.component.html',
  styleUrl: './sum-a-task.component.scss',
})

/**
 * Represents a sum a-task component.
 */
export class SumATaskComponent {
  @Input() task = {
    defaultPath: './assets/img/summary/to_do.png',
    hoverPath: './assets/img/summary/to_do_hover.png',
    alt: 'to_do',
    amount: 1,
    category: 'To-do',
  };
  currentPath: String = this.task.defaultPath;

  /**
   * Sets the current path of the icon.
   * @param logical - A boolean value.
   */
  set(logical: boolean) {
    this.currentPath = logical ? this.task.hoverPath : this.task.defaultPath;
  }
}
