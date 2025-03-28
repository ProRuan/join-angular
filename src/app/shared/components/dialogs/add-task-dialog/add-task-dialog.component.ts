import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../../../components/add-task/add-task.component';
import { BackLogComponent } from '../../back-log/back-log.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { stopPropagation } from '../../../ts/global';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, BackLogComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
  animations: [dialogAnimation],
})

/**
 * Class representing an add-task dialog component.
 * @extends DialogFormController
 */
export class AddTaskDialogComponent extends DialogFormController {
  override id: string = 'addTask';

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
  }

  /**
   * Stops an event on click.
   * @param event - The event.
   */
  override onStop(event: Event) {
    this.dialog.resetAssignedTo();
    this.dialog.close('category');
    stopPropagation(event);
  }
}
