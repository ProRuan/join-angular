import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-task-info',
  standalone: true,
  imports: [],
  templateUrl: './summary-task-info.component.html',
  styleUrl: './summary-task-info.component.scss',
})
export class SummaryTaskInfoComponent {
  @Input() task = {
    amount: 5,
    category: 'Tasks in Board',
  };
}
