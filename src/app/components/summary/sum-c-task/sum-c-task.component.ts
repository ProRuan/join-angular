import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-c-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-c-task.component.html',
  styleUrl: './sum-c-task.component.scss',
})

/**
 * Represents a sum c-task component.
 */
export class SumCTaskComponent {
  @Input() task = {
    amount: 5,
    category: 'Tasks in Board',
  };
}
