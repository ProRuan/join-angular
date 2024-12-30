import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subtask } from '../../models/subtask';
import { getTime } from '../../ts/global';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss',
})

/**
 * Represents a subtask component.
 */
export class SubtaskComponent {
  @Input() subtask: Subtask = new Subtask();

  doubleClick: boolean = false;
  timestamp: number = 0;
  clickTimeout?: ReturnType<typeof setTimeout>;

  @Output('edit') editSubtask = new EventEmitter<boolean>();
  @Output('delete') deleteSubtask = new EventEmitter<Subtask>();

  /**
   * Opens the subtask input on double click.
   */
  onOpen() {
    if (this.doubleClick) {
      this.processesDoubleClick();
    } else {
      this.processFirstClick();
    }
  }

  /**
   * Processes the double click.
   */
  processesDoubleClick() {
    clearTimeout(this.clickTimeout);
    this.doubleClick = false;
    this.editSubtask.emit(this.subtask.focussed);
    this.subtask.focussed = true;
  }

  /**
   * Processes the first click.
   */
  processFirstClick() {
    this.doubleClick = true;
    this.timestamp = getTime();
    this.clickTimeout = setTimeout(() => {
      this.doubleClick = false;
    }, 250);
  }

  /**
   * Edits the subtask on click.
   */
  onEdit() {
    this.editSubtask.emit(this.subtask.focussed);
    this.subtask.focussed = true;
  }

  /**
   * Deletes the subtask on click.
   */
  onDelete() {
    this.deleteSubtask.emit(this.subtask);
  }

  /**
   * Saves the subtask on click.
   */
  onSave() {
    this.subtask.focussed = false;
  }
}
