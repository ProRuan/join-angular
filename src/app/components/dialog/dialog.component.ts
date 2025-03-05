import { Component, inject } from '@angular/core';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from './view-task-dialog/view-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { BoardService } from '../../shared/services/board.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskDialogComponent,
    ViewTaskDialogComponent,
    EditTaskDialogComponent,
    ContactDialogComponent,
    DeleteContactDialogComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialog: DialogService = inject(DialogService);
  board: BoardService = inject(BoardService);

  // View/EditTaskDialogComponent
  // ----------------------------
  // rename this.dialog.deleted to updated ... ?!
  // ViewTaskComponent and EditTaskComponent ...
  //   --> OR: AddTaskDialogComponent ...

  // improve logo animation ... !!!
  // set task-dialog animations ... (1/4)

  // update add-task menus ...
  // update view-task, edit-task, delete-task ...
  // update contact dialogs ...

  // only subscription on open?!

  // AddTaskDialogComponent
  // ----------------------
  // set transition 100ms ease-in-out ...
  // close flip-menu on click ... !

  // update/add all back logs ... !
  // fix all icons with size + object-fit ... !

  // ViewTaskDialogComponent
  // -----------------------
  // set subtask id ... !
  // view-task dialog component: check getClass() ...

  // EditTaskDialogComponent
  // -----------------------
  // complete edit-task dialog component ... !
  // fix transition: open, close, submitted ... (0/3)
  // animation by browser moduls or css ...

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
