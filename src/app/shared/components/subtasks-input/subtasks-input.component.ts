import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { SubtaskComponent } from '../subtask/subtask.component';
import { Subtask } from '../../models/subtask';
import { stop } from '../../ts/global';

@Component({
  selector: 'app-subtasks-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LabelComponent, SubtaskComponent],
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

  @Output('update') subtasksUpdate = new EventEmitter<Subtask[]>();

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
   * Empties the input.
   */
  empty() {
    this.value = '';
  }

  /**
   * Empties the input on click.
   */
  onEmpty() {
    this.empty();
  }

  /**
   * Verifies the fill state of the subtasks array.
   * @returns - A boolean value.
   */
  isSubtasksFilled() {
    return this.subtasks.length > 0;
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Resets the focus of all subtasks on edit.
   */
  onResetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focussed = false;
    });
  }

  /**
   * Deletes the subtask on delete.
   * @param subtask - The subtask.
   */
  onDelete(subtask: Subtask) {
    let index = this.subtasks.indexOf(subtask);
    if (index > -1) {
      this.subtasks.splice(index, 1);
    }
  }
}
