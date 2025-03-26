import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskDialogComponent } from '../dialog/add-task-dialog/add-task-dialog.component';
import { ViewTaskDialogComponent } from '../dialog/view-task-dialog/view-task-dialog.component';
import { EditTaskDialogComponent } from '../dialog/edit-task-dialog/edit-task-dialog.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColumnComponent } from './column/column.component';
import { JoinService } from '../../shared/services/join.service';
import { ButtonDataService } from '../../shared/services/button-data.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { JoinButton } from '../../shared/models/join-button';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddTaskDialogComponent,
    ViewTaskDialogComponent,
    EditTaskDialogComponent,
    JoinTitleComponent,
    SearchInputComponent,
    ButtonComponent,
    ColumnComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})

/**
 * Class representing a board component.
 */
export class BoardComponent {
  join: JoinService = inject(JoinService);
  buttons: ButtonDataService = inject(ButtonDataService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  // review onAdd() ...
  // add isMobileWidth() to join service ...

  // add responsiveness for board ...
  // add responsiveness for dialogs ...

  title: string = 'Board';
  addTaskBtn = new JoinButton('addTaskBtn');

  /**
   * Gets user tasks.
   * @returns The user tasks.
   */
  get tasks() {
    return this.join.user.tasks;
  }

  /**
   * Sets user tasks.
   * @param tasks - The tasks to set.
   */
  set tasks(tasks: Task[]) {
    this.join.user.tasks = tasks;
  }

  /**
   * Resets a targeted column on dragleave.
   */
  onReset() {
    this.board.targetedColumn = '';
  }

  /**
   * Opens an add-task dialog on click.
   */
  onAdd() {
    if (this.join.windowWidth < 1180 + 1) {
      this.nav.navigateByLink('add-task');
    } else {
      this.dialog.open('addTask');
    }
  }

  /**
   * Gets the tasks of a column.
   * @param column - The column.
   * @returns The tasks of the column.
   */
  getTasks(column: string) {
    return this.tasks.filter((t) => t.column == column);
  }
}
