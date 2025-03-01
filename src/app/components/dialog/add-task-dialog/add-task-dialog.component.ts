import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { JoinDialog } from '../../../shared/models/join-dialog';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        group([
          style({ backgroundColor: 'transparent' }),
          animate(
            '300ms ease-in-out',
            style({ backgroundColor: 'rgba(0, 0, 0, 0.25)' })
          ),
          query('.transit-cont', [
            style({ transform: 'translateX(100%)' }),
            animate('300ms ease-in-out', style({ transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
      transition(':leave', [
        group([
          animate(
            '300ms ease-in-out',
            style({ backgroundColor: 'transparent' })
          ),
          query('.transit-cont', [
            animate(
              '300ms ease-in-out',
              style({ transform: 'translateX(100%)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
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
