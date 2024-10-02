import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-task-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-task-c.component.html',
  styleUrl: './sum-task-c.component.scss',
})
export class SumTaskCComponent {
  @Input() task = {
    amount: 5,
    category: 'Tasks in Board',
  };
}
