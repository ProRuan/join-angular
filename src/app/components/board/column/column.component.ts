import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DraggableTaskComponent } from '../draggable-task/draggable-task.component';
import { JoinService } from '../../../shared/services/join.service';
import { BoardService } from '../../../shared/services/board.service';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DraggableTaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})

/**
 * Class representing a column component.
 */
export class ColumnComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);

  @Input() name: string = 'To do';
  @Input() tasks: Task[] = [];

  id: string = '';
  dialogId: string = 'addTask';
  displayed: boolean = true;
  cardHeight: number = 244;
  columnGap: number = 16;
  shadowConst: number = 3;

  /**
   * Initializes a column component.
   */
  ngOnInit() {
    this.id = this.getId();
    this.displayed = this.isButtonDisplayed();
  }

  /**
   * Gets a column id.
   * @returns The column id.
   */
  private getId() {
    return this.name.toLowerCase().replaceAll(' ', '-');
  }

  /**
   * Verifies the display state of a button.
   * @returns A boolean value.
   */
  private isButtonDisplayed() {
    return this.id !== 'done';
  }

  /**
   * Gets a board style.
   * @returns The board style.
   */
  getStyle() {
    if (!this.join.isMobile()) {
      let value = this.getBoardHeight();
      return { minHeight: `${value}px` };
    } else {
      return null;
    }
  }

  /**
   * Gets a board height
   * @returns The board height.
   */
  private getBoardHeight() {
    let factor = this.board.heightFactor;
    return (
      this.cardHeight * (factor + 1) +
      this.columnGap * factor +
      this.shadowConst
    );
  }

  /**
   * Opens an add-task form on click.
   */
  onAddTask() {
    this.board.onAdd();
  }

  /**
   * Sets a targeted column on dragover.
   * @param event - The event.
   */
  onSetTarget(event: Event) {
    this.board.targetedColumn = this.id;
    if (this.board.isNeighborColumn(this.id)) {
      event.preventDefault();
    }
  }

  /**
   * Updates a task on drop.
   * @param column - The targeted column.
   */
  onUpdateTask(column: string) {
    this.board.task.column = column;
    this.board.setDrag();
    this.join.updateSummary();
    this.join.saveUser();
    this.board.setHeightFactor(this.join.user.tasks);
  }

  /**
   * Verifies the display state of a placeholder.
   * @returns A boolean value.
   */
  isPlaceholderDisplayed() {
    let columnEmpty = this.isColumnEmpty();
    let neighborColumn = this.isNeighborColumn();
    return columnEmpty && !neighborColumn;
  }

  /**
   * Verifies the empty state of a column.
   * @returns A boolean value.
   */
  private isColumnEmpty() {
    return !this.tasks.some((t) => t.column === this.id);
  }

  /**
   * Verifies a neighbor column.
   * @returns A boolean value.
   */
  isNeighborColumn() {
    let dragStarted = this.board.dragStarted;
    let neighborColumn = this.board.isNeighborColumn(this.id);
    return dragStarted && neighborColumn;
  }

  /**
   * Verifies a task to filter.
   * @param task - The task.
   * @returns A boolean value.
   */
  isTaskFiltered(task: Task) {
    let titleFiltered = this.isFiltered(task.title);
    let descriptionFiltered = this.isFiltered(task.description);
    return titleFiltered || descriptionFiltered;
  }

  /**
   * Verifies a match between filter and value.
   * @param value - The value.
   * @returns A boolean value.
   */
  private isFiltered(value: string) {
    return value.toLowerCase().includes(this.board.filter);
  }

  /**
   * Verifies the css class of a feedback background color.
   * @returns The css class of the feedback background color.
   */
  getBgcClass() {
    return this.board.targetedColumn === this.id ? 'bgc' : '';
  }
}
