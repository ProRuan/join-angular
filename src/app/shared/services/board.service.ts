import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a board service.
 */
export class BoardService {
  readonly columns: string[] = [
    'to-do',
    'in-progress',
    'await-feedback',
    'done',
  ];

  filter: string = '';
  draggedTask: Task = new Task();
  dragStarted: boolean = false;
  neighborColumns: string[] = [];
  targetedColumn: string = '';

  /**
   * Sets the drag by task.
   * @param task - The draggable task.
   */
  setDrag(task?: Task) {
    this.draggedTask = task ? task : new Task();
    this.dragStarted = task ? true : false;
    this.setNeighborColumns(task?.column);
  }

  /**
   * Sets the neighbor columns.
   * @param column - The current column.
   */
  setNeighborColumns(column?: string) {
    this.neighborColumns = [];
    if (column) {
      let indices = this.getIndices(column);
      this.addColumn(indices.previous);
      this.addColumn(indices.next);
    }
  }

  /**
   * Provides the neighbor indices as object.
   * @param column - The current column.
   * @returns - The neighbor indices.
   */
  getIndices(column: string) {
    let index = this.columns.indexOf(column);
    return { previous: index - 1, next: index + 1 };
  }

  /**
   * Adds the neighbor column.
   * @param index - The neighbor index.
   */
  addColumn(index: number) {
    if (this.isIndex(index)) {
      this.neighborColumns.push(this.columns[index]);
    }
  }

  /**
   * Verifies the neighbor index.
   * @param index - The neighbor index.
   * @returns - A boolean value.
   */
  isIndex(index: number) {
    return -1 < index && index < this.columns.length;
  }

  /**
   * Verifies the neighbor column.
   * @param column - The neighbor column.
   * @returns - A boolean value.
   */
  isNeighborColumn(column: string) {
    return this.neighborColumns.includes(column);
  }
}
