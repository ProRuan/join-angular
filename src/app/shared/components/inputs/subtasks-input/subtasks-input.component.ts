import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';
import { Subtask } from '../../../models/subtask';
import { getTime, IntervalId, stopPropagation } from '../../../ts/global';

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
 * Class representing a subtasks input component.
 * @extends ReactiveInput
 */
export class SubtasksInputComponent extends ReactiveInput {
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'subtask';
  doubleClick: boolean = false;
  timestamp: number = 0;
  clickTimeout?: IntervalId;

  @Input() override control: AbstractControl<any, any> | null = null;
  @Input('subtasks') taskControl: AbstractControl | null = null;

  /**
   * Gets subtasks.
   * @returns The subtasks.
   */
  get subtasks() {
    return this.taskControl?.value;
  }

  /**
   * Sets subtasks.
   * @param subtasks - The subtasks to set.
   */
  set subtasks(subtasks: Subtask[]) {
    this.taskControl?.setValue(subtasks);
  }

  /**
   * Marks an input as dirty on change.
   */
  override onChange() {
    this.markAsDirty(this.taskControl);
  }

  /**
   * Adds a subtask on click.
   */
  onAdd() {
    if (this.isFilled()) {
      this.updateSubtasks();
      this.updateSubtaskIds();
      this.clear();
    }
  }

  /**
   * Updates subtasks.
   */
  updateSubtasks() {
    let subtask = this.getSubtask();
    this.subtasks = [...this.subtasks, subtask];
  }

  /**
   * Gets a subtask.
   * @returns The subtask.
   */
  getSubtask() {
    let subtask = new Subtask();
    subtask.text = this.value;
    return subtask;
  }

  /**
   * Updates subtask ids.
   */
  updateSubtaskIds() {
    for (let i = 0; i < this.subtasks.length; i++) {
      let subtask = this.subtasks[i];
      subtask.id = i;
    }
  }

  /**
   * Clears an input.
   */
  clear() {
    this.value = '';
  }

  /**
   * Clears an input on click.
   */
  onClear() {
    this.clear();
  }

  /**
   * Verifies the filled state of a subtasks array.
   * @returns A boolean value.
   */
  isSubtasksFilled() {
    return this.subtasks.length > 0;
  }

  /**
   * Stops an event.
   * @param event - The event.
   */
  onStop(event: Event) {
    stopPropagation(event);
  }

  /**
   * Verifies the opened state of a subtask editor.
   * @param i - The subtask index.
   * @returns A boolean value.
   */
  isOpened(i: number) {
    let focused = this.subtasks[i].focussed;
    let opened = this.dialog.isOpened('subtask');
    return focused && opened;
  }

  /**
   * Opens a subtask editor on double click.
   */
  onDoubleClick(i: number) {
    if (this.doubleClick) {
      this.processDoubleClick(i);
    } else {
      this.processFirstClick();
    }
  }

  /**
   * Processes a double click.
   */
  processDoubleClick(i: number) {
    clearTimeout(this.clickTimeout);
    this.doubleClick = false;
    this.openEditor(i);
  }

  /**
   * Opens a subtask editor.
   * @param i - The subtask index.
   */
  openEditor(i: number) {
    this.resetFocus();
    this.subtasks[i].focussed = true;
    this.dialog.open(this.dialogId);
  }

  /**
   * Resets the focus of all subtasks.
   */
  resetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focussed = false;
    });
  }

  /**
   * Processes a first click.
   */
  processFirstClick() {
    this.doubleClick = true;
    this.timestamp = getTime();
    this.clickTimeout = setTimeout(() => {
      this.doubleClick = false;
    }, 250);
  }

  /**
   * Opens a subtask editor on click.
   * @param i - The subtask index.
   */
  onEdit(i: number) {
    this.openEditor(i);
  }

  /**
   * Deletes a subtask on click.
   * @param i - The subtask index.
   */
  onDelete(i: number) {
    this.delete(i);
  }

  /**
   * Deletes a subtask.
   * @param i - The subtask index.
   */
  delete(i: number) {
    this.dialog.close(this.dialogId);
    this.subtasks.splice(i, 1);
    this.updateSubtaskIds();
  }

  /**
   * Saves a subtask on click.
   */
  onSave(i: number) {
    this.isTextContained(i) ? this.save(i) : this.delete(i);
  }

  /**
   * Verifies a subtask containing text.
   * @param i - The subtask index.
   * @returns A boolean value.
   */
  isTextContained(i: number) {
    return this.subtasks[i].text.length > 0;
  }

  /**
   * Saves a subtask.
   * @param i - The subtask index.
   */
  save(i: number) {
    this.subtasks[i].focussed = false;
    this.dialog.close(this.dialogId);
  }
}
