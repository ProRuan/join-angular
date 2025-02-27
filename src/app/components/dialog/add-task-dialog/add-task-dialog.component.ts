import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { JoinDialog } from '../../../shared/models/join-dialog';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})

/**
 * Class representing an add-task dialog component.
 * @extends JoinDialog
 */
export class AddTaskDialogComponent extends JoinDialog {
  override id: string = 'addTask';
}
