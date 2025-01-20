import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DraggableTaskComponent } from '../draggable-task/draggable-task.component';
import { JoinService } from '../../../shared/services/join.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DraggableTaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})

/**
 * Represents a column component.
 */
export class ColumnComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  @Input() name: string = 'To do';
  @Input() tasks: Task[] = [];
  id: string = '';
  displayed: boolean = true;
  dialogId: string = 'addTask';

  /**
   * Initializes a column component.
   */
  ngOnInit() {
    this.id = this.getId();
    this.displayed = this.isButtonDisplayed();
  }

  /**
   * Provides the column id.
   * @returns - The id.
   */
  getId() {
    return this.name.toLowerCase().replace(' ', '-');
  }

  /**
   * Verifies the display state of the button.
   * @returns - A boolean value.
   */
  isButtonDisplayed() {
    return this.id != 'done';
  }

  /**
   * Adds a task on click.
   */
  onAddTask() {
    this.dialog.open(this.dialogId);
  }

  /**
   * Sets the targeted column on dragover.
   * @param event - The event.
   */
  onSetTarget(event: Event) {
    this.board.targetedColumn = this.id;
    if (this.board.isNeighborColumn(this.id)) {
      event.preventDefault();
    }
  }

  /**
   * Updates the task on drop.
   * @param column - The targeted column.
   */
  async onUpdateTask(column: string) {
    this.board.task.column = column;
    this.board.setDrag();
    this.summary.update();
    await this.join.saveUser();
  }

  /**
   * Verifies the empty state of the column.
   * @returns - A boolean value.
   */
  isColumnEmpty() {
    return !this.tasks.some((t) => t.column == this.id);
  }

  /**
   * Verifies the task to filter.
   * @param task - The task.
   * @returns - A boolean value.
   */
  isTaskFiltered(task: Task) {
    let titleFiltered = this.isFiltered(task.title);
    let descriptionFiltered = this.isFiltered(task.description);
    return titleFiltered || descriptionFiltered;
  }

  /**
   * Verifies the match between filter and value.
   * @param value - The value.
   * @returns - A boolean value.
   */
  isFiltered(value: string) {
    value = value.toLowerCase();
    return value.includes(this.board.filter);
  }

  /**
   * Verifies the neighbor column.
   * @returns - A boolean value.
   */
  isNeighborColumn() {
    let dragStarted = this.board.dragStarted;
    let neighborColumn = this.board.isNeighborColumn(this.id);
    return dragStarted && neighborColumn;
  }

  /**
   * Verifies the css class of the feedback background color.
   * @returns - The css class to apply.
   */
  getBgcClass() {
    return this.board.targetedColumn == this.id ? 'bgc' : '';
  }
}
