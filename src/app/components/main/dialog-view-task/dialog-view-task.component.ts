import { Component, inject } from '@angular/core';
import { DialogViewTaskService } from '../../../shared/services/dialog-view-task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-view-task.component.html',
  styleUrl: './dialog-view-task.component.scss',
})
export class DialogViewTaskComponent {
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);

  stop(event: Event) {
    event.stopPropagation();
  }

  // double code
  color() {
    let color = this.dvtData.task.category.toLowerCase();
    return color.replace(' ', '-');
  }

  // added subtasks to template!!!
}
