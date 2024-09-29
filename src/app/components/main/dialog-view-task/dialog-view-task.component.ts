import { Component, inject } from '@angular/core';
import { DialogViewTaskService } from '../../../shared/services/dialog-view-task.service';

@Component({
  selector: 'app-dialog-view-task',
  standalone: true,
  imports: [],
  templateUrl: './dialog-view-task.component.html',
  styleUrl: './dialog-view-task.component.scss',
})
export class DialogViewTaskComponent {
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);

  stop(event: Event) {
    event.stopPropagation();
  }
}
