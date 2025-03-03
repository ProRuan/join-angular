import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { dialogAnimation } from '../../../shared/animations/dialog/dialog.animation';
import { JoinDialog } from '../../../shared/models/join-dialog';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
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

  // give fade out to dialog class ... ?!
  // set transition 100ms ease-in-out ...
  // rename fade to shade ... !
  // close flip-menu on click ... !

  // backlog: delay 900ms ...
  // backlog animation ...
  // update/add all back logs ... !
  // fix all icons with size + object-fit ... !

  // <app-back-log *ngIf="dialog.submitted" text="Task added to board" img="board_icon"></app-back-log>

  backLog = {
    displayed: false,
    text: 'Task added to board',
    img: 'board_icon',
  };

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
  }

  override getTransitClass(): string {
    return this.dialog.submitted ? 'fade' : 'slide';
  }
}
