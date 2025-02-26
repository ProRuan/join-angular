import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColumnComponent } from './column/column.component';
import { JoinService } from '../../shared/services/join.service';
import { ButtonDataService } from '../../shared/services/button-data.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { JoinButton } from '../../shared/models/join-button';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

  title: string = 'Board';
  addTaskBtn = new JoinButton();

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
   * Initializes a board component.
   */
  ngOnInit() {
    this.addTaskBtn.set(this.buttons.addTaskBtn);
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
    this.dialog.openDialog('addTask');
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
