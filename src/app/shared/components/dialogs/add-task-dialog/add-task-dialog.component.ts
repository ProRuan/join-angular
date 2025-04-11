import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../../../components/add-task/add-task.component';
import { BacklogComponent } from '../../backlog/backlog.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { stopPropagation } from '../../../ts/global';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, BacklogComponent],
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

  backlogText: string = 'Task added to board';
  backlogImage: string = 'board_icon';

  /**
   * Gets the css class of a backlog container.
   * @returns The css class of the backlog container.
   */
  getBacklogContClass() {
    return this.dialogs.getBacklogContClass();
  }

  /**
   * Gets the css class of a backlog.
   * @returns The css class of a backlog.
   */
  getBacklogClass() {
    return this.dialogs.isLogged() ? 'o-1' : 'o-0';
  }

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
    this.dialogs.resetAssignedTo();
    this.dialogs.close('category');
    stopPropagation(event);
  }
}
