import { Component, inject } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { DialogAddTaskService } from '../../../shared/services/dialog-add-task.service';

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss',
})
export class DialogAddTaskComponent {
  datData: DialogAddTaskService = inject(DialogAddTaskService);

  stop(event: Event) {
    event.stopPropagation();
  }
}
