import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';
import { stopPropagation } from '../../../ts/global';

@Component({
  selector: 'app-category-input',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './category-input.component.html',
  styleUrl: './category-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, CategoryInputComponent),
    getProvider(NG_VALUE_ACCESSOR, CategoryInputComponent),
  ],
})

/**
 * Class representing a category input component.
 * @extends ReactiveInput
 */
export class CategoryInputComponent extends ReactiveInput {
  dialogs: DialogService = inject(DialogService);

  dialogId: string = 'category';

  @Input() override control: AbstractControl | null = null;

  /**
   * Handles a dialog on click.
   * @param event - The event.
   */
  onHandle(event: Event) {
    this.dialogs.resetAssignedTo();
    stopPropagation(event);
  }

  /**
   * Switches a category menu on click.
   */
  onSwitch() {
    this.dialogs.switch(this.dialogId);
  }

  /**
   * Gets the source path of an arrow.
   * @returns The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialogs.getArrowSrc(this.dialogId);
  }

  /**
   * Gets the css class of an item list.
   * @returns The css class of the item list.
   */
  getListClass() {
    return this.dialogs.isOpened(this.dialogId) ? 'show' : 'hide';
  }

  /**
   * Selects a category on click.
   * @param element - The category item.
   */
  onSelect(element: HTMLDivElement) {
    this.value = element.innerText;
    this.dialogs.close(this.dialogId);
    this.markAsDirty(this.control);
  }
}
