import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColumnComponent } from './column/column.component';
import { JoinService } from '../../shared/services/join.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { ButtonData } from '../../shared/interfaces/button-data';
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
 * Represents a board component.
 */
export class BoardComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  title: string = 'Board';

  addTaskBtn: ButtonData = {
    buttonClass: 'create-btn slim',
    contClass: 'cont-92',
    textClass: 'create-btn-text',
    text: 'Add task',
    imgClass: 'img-32',
    src: '/assets/img/board/add.png',
    alt: 'add',
  };

  /**
   * Provides the user tasks.
   */
  get tasks() {
    return this.join.user.tasks;
  }

  /**
   * Sets the user tasks.
   */
  set tasks(tasks: Task[]) {
    this.join.user.tasks = tasks;
  }

  /**
   * Initializes a board component.
   */
  async ngOnInit() {
    await this.join.loadUser();
    this.join.subscribeUser();
  }

  /**
   * Resets the targeted column on dragleave.
   */
  onResetTarget() {
    this.board.targetedColumn = '';
  }

  /**
   * Adds a task on click.
   */
  onAddTask() {
    this.dialog.open('addTask');
  }

  /**
   * Provides the tasks of the column.
   * @param column - The column.
   * @returns - The tasks of the column.
   */
  getTasks(column: string) {
    return this.tasks.filter((t) => t.column == column);
  }
}
