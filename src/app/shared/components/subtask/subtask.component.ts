import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { Subtask } from '../../models/subtask';
import { getTime, IntervalId, stop } from '../../ts/global';

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
  dialog: DialogService = inject(DialogService);

  @Input() subtask: Subtask = new Subtask();
  @Input() set id(id: number) {
    this.subtask.id = id;
  }

  dialogId: string = 'subtask';
  doubleClick: boolean = false;
  timestamp: number = 0;
  clickTimeout?: IntervalId;

  @Output('edit') editSubtask = new EventEmitter<boolean>();
  @Output('delete') deleteSubtask = new EventEmitter<number>();

  /**
   * Verifies the opened state of the subtask editor.
   * @returns - A boolean value.
   */
  isOpen() {
    return this.subtask.focussed && this.dialog.isOpened('subtask');
  }

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
    this.dialog.open(this.dialogId);
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
    this.dialog.open(this.dialogId);
  }

  /**
   * Deletes the subtask on click.
   */
  onDelete() {
    this.deleteSubtask.emit(this.subtask.id);
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Saves the subtask on click.
   */
  onSave() {
    this.subtask.focussed = false;
    this.dialog.close(this.dialogId);
  }
}
