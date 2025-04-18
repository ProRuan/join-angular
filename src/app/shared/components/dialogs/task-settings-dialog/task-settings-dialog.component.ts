import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { fadeAnimation } from '../../../animations/fade-animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { BoardService } from '../../../services/board.service';
import { getCapitalized } from '../../../ts/global';

@Component({
  selector: 'app-task-settings-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-settings-dialog.component.html',
  styleUrl: './task-settings-dialog.component.scss',
  animations: [fadeAnimation],
})

/**
 * Class representing a task settings dialog component.
 * @extends DialogFormController
 */
export class TaskSettingsDialogComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);

  override id: string = 'taskSettings';

  columns: string[] = [];
  previousColumn: string = '';
  nextColumn: string = '';
  firstId: number = 0;
  lastId: number = -1;
  currentId: number = -1;
  previousId: number = -1;
  nextId: number = -1;

  /**
   * Gets a current column.
   * @returns The current column.
   */
  get currentColumn() {
    return this.board.task.column;
  }

  /**
   * Sets a current column.
   * @param column - The column to set.
   */
  set currentColumn(column: string) {
    this.board.task.column = column;
  }

  /**
   * Initializes a task settings dialog component.
   */
  ngOnInit() {
    this.columns = this.board.columns;
    this.currentColumn = this.board.task.column;
    this.lastId = this.getLastId();
    this.currentId = this.getCurrentId();
    this.previousId = this.getPreviousId();
    this.nextId = this.getNextId();
    this.previousColumn = this.getColumn(this.previousId, true);
    this.nextColumn = this.getColumn(this.nextId, true);
  }

  /**
   * Gets the last column id.
   * @returns The last column id.
   */
  getLastId() {
    return this.columns.length - 1;
  }

  /**
   * Gets the current column id.
   * @returns The current column id.
   */
  getCurrentId() {
    return this.columns.indexOf(this.currentColumn);
  }

  /**
   * Gets the previous column id.
   * @returns The previous column id.
   */
  getPreviousId() {
    return this.isPrevious() ? this.currentId - 1 : this.firstId;
  }

  /**
   * Verifies a previous column id.
   * @returns A boolean value.
   */
  isPrevious() {
    return this.firstId < this.currentId;
  }

  /**
   * Gets the next column id.
   * @returns The next column id.
   */
  getNextId() {
    return this.isNext() ? this.currentId + 1 : this.lastId;
  }

  /**
   * Verifies a next column id.
   * @returns A boolean value.
   */
  isNext() {
    return this.currentId < this.lastId;
  }

  /**
   * Gets a column by id.
   * @param id - The column id.
   * @param formatted - A boolean value.
   * @returns The column.
   */
  getColumn(id: number, formatted: boolean = false) {
    let column = this.board.columns[id];
    return formatted ? this.getFormattedColumn(column) : column;
  }

  /**
   * Gets a formatted column name.
   * @param column - The column name to format.
   * @returns The formatted column name.
   */
  getFormattedColumn(column: string) {
    return getCapitalized(column.split('-').join(' '));
  }

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.closeDialog();
  }

  /**
   * Closes a dialog.
   */
  closeDialog() {
    this.close();
    this.board.setDefaultTask('task');
  }

  /**
   * Moves a task to the upper column on click.
   */
  onMoveUp() {
    this.updateTaskColumn(this.previousId);
  }

  /**
   * Updates a task column.
   * @param id - The column id.
   */
  updateTaskColumn(id: number) {
    this.currentColumn = this.getColumn(id);
    this.saveChanges();
    this.closeDialog();
  }

  /**
   * Saves changes.
   */
  saveChanges() {
    this.join.updateSummary();
    this.join.saveUser();
    this.board.setHeightFactor(this.join.user.tasks);
  }

  /**
   * Moves a task to the lower column on click.
   */
  onMoveDown() {
    this.updateTaskColumn(this.nextId);
  }
}
