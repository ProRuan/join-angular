import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { BackLogComponent } from '../../../shared/components/back-log/back-log.component';
import { dialogAnimation } from '../../../shared/animations/dialog.animation';
import { DialogFormController } from '../../../shared/models/dialog-form-controller';

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
}
