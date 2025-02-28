import { Component, inject } from '@angular/core';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from './view-task-dialog/view-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { BoardService } from '../../shared/services/board.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskDialogComponent,
    ViewTaskDialogComponent,
    EditTaskDialogComponent,
    // DeleteTaskDialogComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialog: DialogService = inject(DialogService);
  board: BoardService = inject(BoardService);

  // Dialog Component
  // ----------------
  // remove transit-class to app-dialog classes ... (0/4)
  // fix delete-task dialog transition (bgc/box) ...
  // verfiy dialog and dialog comp transitions ... (0/5)
  // rename stop() to stopEvent() or stopPropagation() ...
  // double style of dialogs ... (0/4)
  // double style of close button ... (0/4+)

  getDialogClass() {
    return !this.dialog.dialogOpened ? 'closed' : '';
  }

  // attention: edit-task dialog?!
  onClose() {
    this.dialog.closeAllDialogs();
    // set defaultTask for viewTask and editTask ... (0/2)
  }

  getDialogBoxClass(id: string) {
    return this.dialog.currDialog != id ? 'hidden' : '';
  }

  getSubdialogboxClass() {
    return !this.dialog.isOpened('deleteTask') ? 'hidden' : '';
  }

  // getDisplayClass(id: string) {
  //   let opened = !this.isClosed();
  //   let dialogOpened = this.dialog.isOpened(id);
  //   return opened && !dialogOpened ? 'd-none' : '';
  // }

  // isOpened(id: string) {
  //   let opened = !this.isClosed();
  //   return opened && this.dialog.isOpened(id);
  // }

  // getDialogClass() {
  //   let closed = this.isClosed();
  //   return closed ? 'closed' : '';
  // }

  // isClosed() {
  //   let dialogsOpened = this.ids.map((id) => this.dialog.isOpened(id));
  //   return !dialogsOpened.includes(true);
  // }
}
