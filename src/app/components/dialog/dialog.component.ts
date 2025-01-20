import { Component, inject } from '@angular/core';
import { stop } from '../../shared/ts/global';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from './view-task-dialog/view-task-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, AddTaskDialogComponent, ViewTaskDialogComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialog: DialogService = inject(DialogService);

  onStop(event: Event) {
    stop(event);
  }

  onClose(id: string) {
    this.dialog.close(id);
  }
}
