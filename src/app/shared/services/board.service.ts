import { inject, Injectable } from '@angular/core';
import { JoinService } from './join.service';
import { DialogService } from './dialog.service';
import { NavigationService } from './navigation.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a board service.
 */
export class BoardService {
  join: JoinService = inject(JoinService);
  dialogs: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  readonly columns: string[] = [
    'to-do',
    'in-progress',
    'await-feedback',
    'done',
  ];

  [key: string]: any;
  task = new Task();
  cachedTask = new Task();
  defaultTask = new Task();
  heightFactor: number = 0;
  filter: string = '';
  targetedColumn: string = '';
  neighborColumns: string[] = [];
  dragStarted: boolean = false;

  /**
   * Sets the height factor needed to calculate a board minimum height.
   * @param tasks - The board tasks.
   */
  setHeightFactor(tasks: Task[]) {
    this.heightFactor = 0;
    let numbers = this.getTaskNumbers(tasks);
    this.setHighestFactor(numbers);
  }

  /**
   * Gets task numbers.
   * @param tasks - The board tasks.
   * @returns The task numbers.
   */
  getTaskNumbers(tasks: Task[]) {
    return this.columns.map((c) => this.getTaskAmount(tasks, c));
  }

  /**
   * Gets a task amount by column.
   * @param tasks - The board tasks.
   * @param column - The column id.
   * @returns The task amount.
   */
  getTaskAmount(tasks: Task[], column: string) {
    return tasks.filter((t) => t.column === column).length;
  }

  /**
   * Sets the highest task number as board height factor.
   * @param numbers - The task numbers.
   */
  setHighestFactor(numbers: number[]) {
    for (let n of numbers) {
      if (n > this.heightFactor) {
        this.heightFactor = n;
      }
    }
  }

  /**
   * Opens an add-task form on click.
   */
  onAdd() {
    if (this.join.isMobile()) {
      this.nav.navigateByLink('add-task');
    } else {
      this.dialogs.open('addTask');
    }
  }

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
   * Sets a task to default.
   */
  setDefaultTask(key: string) {
    this[key] = this.defaultTask;
  }
}
