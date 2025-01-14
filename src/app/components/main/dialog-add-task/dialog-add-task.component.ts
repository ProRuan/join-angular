import { Component, inject } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss',
})
export class DialogAddTaskComponent {
  dialog: DialogService = inject(DialogService);

  stop(event: Event) {
    event.stopPropagation();
  }
}
