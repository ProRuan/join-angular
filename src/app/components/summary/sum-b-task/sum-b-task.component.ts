import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-b-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-b-task.component.html',
  styleUrl: './sum-b-task.component.scss',
})

/**
 * Represents a sum b-task component.
 */
export class SumBTaskComponent {
  @Input() task = {
    urgent: 1,
    deadline: 'October 16, 2024',
  };
}
