import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a board service.
 */
export class BoardService {
  readonly columns: string[] = [
    'to-do',
    'in-progress',
    'await-feedback',
    'done',
  ];

  filter: string = '';
  task: Task = new Task();
  defaultTask = new Task();
  dragStarted: boolean = false;
  neighborColumns: string[] = [];
  targetedColumn: string = '';

  /**
   * Sets a drag by task.
   * @param task - The draggable task.
   */
  setDrag(task?: Task) {
    this.task = task ? task : new Task();
    this.dragStarted = task ? true : false;
    this.setNeighborColumns(task?.column);
  }

  /**
   * Sets neighbor columns.
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
   * Gets neighbor indices as object.
   * @param column - The current column.
   * @returns The neighbor indices.
   */
  getIndices(column: string) {
    let index = this.columns.indexOf(column);
    return { previous: index - 1, next: index + 1 };
  }

  /**
   * Adds a neighbor column.
   * @param index - The neighbor index.
   */
  addColumn(index: number) {
    if (this.isIndex(index)) {
      this.neighborColumns.push(this.columns[index]);
    }
  }

  /**
   * Verifies a neighbor index.
   * @param index - The neighbor index.
   * @returns A boolean value.
   */
  isIndex(index: number) {
    return -1 < index && index < this.columns.length;
  }

  /**
   * Verifies a neighbor column.
   * @param column - The neighbor column.
   * @returns A boolean value.
   */
  isNeighborColumn(column: string) {
    return this.neighborColumns.includes(column);
  }

  /**
   * Sets a task to the default task.
   */
  setDefaultTask() {
    this.task = this.defaultTask;
  }
}
