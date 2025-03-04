import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { BackLogComponent } from '../../../shared/components/back-log/back-log.component';
import { dialogAnimation } from '../../../shared/animations/dialog.animation';
import { JoinDialog } from '../../../shared/models/join-dialog';

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
 * @extends JoinDialog
 */
export class AddTaskDialogComponent extends JoinDialog {
  override id: string = 'addTask';

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
  }
}
