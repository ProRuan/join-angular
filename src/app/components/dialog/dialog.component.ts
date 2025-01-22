import { Component, inject } from '@angular/core';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from './view-task-dialog/view-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskDialogComponent,
    ViewTaskDialogComponent,
    EditTaskDialogComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialog: DialogService = inject(DialogService);

  ids: string[] = ['addTask', 'viewTask', 'editTask'];

  // attention: edit-task dialog?!
  onClose() {
    this.ids.forEach((id) => {
      if (this.dialog.isOpened(id)) {
        this.dialog.close(id);
      }
    });
  }

  getDisplayClass(id: string) {
    let opened = !this.isClosed();
    let dialogOpened = this.dialog.isOpened(id);
    return opened && !dialogOpened ? 'd-none' : '';
  }

  isOpened(id: string) {
    let opened = !this.isClosed();
    return opened && this.dialog.isOpened(id);
  }

  getDialogClass() {
    let closed = this.isClosed();
    return closed ? 'closed' : '';
  }

  isClosed() {
    let dialogsOpened = this.ids.map((id) => this.dialog.isOpened(id));
    return !dialogsOpened.includes(true);
  }
}
