import { Component, inject } from '@angular/core';
import { DialogService } from '../../../shared/services/dialog.service';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})

/**
 * Represents an add-task dialog component.
 */
export class AddTaskDialogComponent {
  dialog: DialogService = inject(DialogService);

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.close('addTask');
  }
}
