import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  currColumn: string = ''; // rename to draggedColumn or necessary at all?
  currTask: Task = new Task(); // rename to draggedTask + check onDragStart()!
  neighborColumns: string[] = [];
  dragStarted: boolean = false;

  filter: string = '';

  setNeighborColumns(column: string) {
    this.neighborColumns = [];
    if (column == 'to-do') {
      this.neighborColumns = ['in-progress'];
    } else if (column == 'in-progress') {
      this.neighborColumns = ['to-do', 'await-feedback'];
    } else if (column == 'await-feedback') {
      this.neighborColumns = ['in-progress', 'done'];
    } else if (column == 'done') {
      this.neighborColumns = ['await-feedback'];
    }
  }
}
