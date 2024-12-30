import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { Subtask } from '../../models/subtask';
import { getTime, stop } from '../../ts/global';

@Component({
  selector: 'app-subtasks-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LabelComponent],
  templateUrl: './subtasks-input.component.html',
  styleUrl: './subtasks-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, SubtasksInputComponent),
    getProvider(NG_VALUE_ACCESSOR, SubtasksInputComponent),
  ],
})

/**
 * Represents a subtasks input component.
 * @extends - The BasicInput.
 */
export class SubtasksInputComponent extends BasicInput {
  subtasks: Subtask[] = [];
  doubleClick: boolean = false;
  timestamp: number = 0;
  clickTimeout?: ReturnType<typeof setTimeout>;

  @Output('update') subtasksUpdate = new EventEmitter<Subtask[]>();

  /**
   * Empties the input on click.
   */
  onEmpty() {
    this.empty();
  }

  /**
   * Empties the input.
   */
  empty() {
    this.value = '';
  }

  /**
   * Adds the subtask on click.
   */
  onAdd() {
    let subtask = this.getSubtask();
    this.subtasks.push(subtask);
    this.subtasksUpdate.emit(this.subtasks);
    this.empty();
  }

  /**
   * Provides the subtask.
   * @returns - The subtask.
   */
  getSubtask() {
    let subtask = new Subtask();
    subtask.text = this.value;
    return subtask;
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Verifies the fill state of the subtasks array.
   * @returns - A boolean value.
   */
  isSubtasksFilled() {
    return this.subtasks.length > 0;
  }

  /**
   * Opens the subtask input on double click.
   * @param i - The index of the subtask.
   */
  onOpen(i: number) {
    if (this.doubleClick) {
      this.processesDoubleClick(i);
    } else {
      this.processFirstClick();
    }
  }

  /**
   * Processes the double click.
   * @param i - The index of the subtask.
   */
  processesDoubleClick(i: number) {
    clearTimeout(this.clickTimeout);
    this.resetFocus();
    this.doubleClick = false;
    this.subtasks[i].focussed = true;
  }

  /**
   * Resets the focus of the subtasks.
   */
  resetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focussed = false;
    });
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
   * @param i - The index of the subtask.
   */
  onEdit(i: number) {
    this.resetFocus();
    this.subtasks[i].focussed = true;
  }

  /**
   * Deletes the subtask on click.
   * @param i - The index of the subtask.
   */
  onDelete(i: number) {
    this.subtasks.splice(i, 1);
  }

  /**
   * Saves the subtask on click.
   * @param i - The index of the subtask.
   */
  onSave(i: number) {
    this.subtasks[i].focussed = false;
  }
}
