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
import { JoinService } from '../../../services/join.service';
import { DialogService } from '../../../services/dialog.service';
import { Subtask } from '../../../models/subtask';
import { getTime, stopPropagation } from '../../../ts/global';
import { IntervalId } from '../../../ts/type';

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
  join: JoinService = inject(JoinService);
  dialogs: DialogService = inject(DialogService);

  dialogId: string = 'subtask';
  doubleClick: boolean = false;
  timestamp: number = 0;
  clickTimeout?: IntervalId;

  @Input() override control: AbstractControl | null = null;
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
   * Gets a subtasks input style.
   * @returns The subtasks input style.
   */
  getSubtasksInputStyle() {
    let value = this.getHeightValue();
    return { height: `${value}px` };
  }

  /**
   * Gets the height value of a subtasks input.
   * @returns The height value of the subtasks input.
   */
  private getHeightValue() {
    let amount = this.subtasks.length;
    let [h, gap, minH, maxH] = this.getStyleParameters();
    let value = amount * h + (amount - 1) * gap + minH + 8;
    return amount ? (value < maxH ? value : maxH) : minH;
  }

  /**
   * Gets a style parameter array.
   * @returns The style parameter array.
   */
  private getStyleParameters() {
    if (this.join.isMobile()) {
      return [48, 4, 74.4, 234.4];
    } else {
      return [32, 8, 80, 240];
    }
  }

  /**
   * Adds a subtask on click.
   */
  onAdd() {
    if (this.isText(this.value)) {
      this.updateSubtasks();
      this.updateSubtaskIds();
      this.clear();
    }
  }

  /**
   * Verifies a text.
   * @param text - The text to verify.
   * @returns A boolean value.
   */
  isText(text: string) {
    return text.trim().length;
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
    subtask.text = this.getTrimmedText(this.value);
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
   * Gets a list style.
   * @returns The list style.
   */
  getListStyle() {
    let amount = this.subtasks.length;
    if ((this.join.isMobile() && amount > 3) || amount > 4) {
      return { maxHeight: '152px', overflowY: 'auto' };
    } else {
      return null;
    }
  }

  /**
   * Verifies the opened state of a subtask editor.
   * @param i - The subtask index.
   * @returns A boolean value.
   */
  isOpened(i: number) {
    let focused = this.subtasks[i].focused;
    let opened = this.dialogs.isOpened('subtask');
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
    this.subtasks[i].focused = true;
    this.dialogs.open(this.dialogId);
  }

  /**
   * Resets the focus of all subtasks.
   */
  resetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focused = false;
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
    this.dialogs.close(this.dialogId);
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
    return this.isText(this.subtasks[i].text);
  }

  /**
   * Saves a subtask.
   * @param i - The subtask index.
   */
  save(i: number) {
    this.subtasks[i].text = this.getSubtaskText(i);
    this.subtasks[i].focused = false;
    this.dialogs.close(this.dialogId);
  }

  /**
   * Gets a subtask text.
   * @param i - The subtask index.
   * @returns The subtask text.
   */
  private getSubtaskText(i: number) {
    return this.getTrimmedText(this.subtasks[i].text);
  }
}
