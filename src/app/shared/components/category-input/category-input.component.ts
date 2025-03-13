import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { DialogService } from '../../services/dialog.service';
import { stopPropagation } from '../../ts/global';

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
 * Represents a category input component.
 * @extends - The BasicIput.
 */
export class CategoryInputComponent extends BasicInput {
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'category';

  @Input('ngModel') override value: string = '';
  @Output('ngModelChange') valueChange = new EventEmitter<string>();

  override required: boolean = true;

  /**
   * Handles the dialog on click.
   * @param event - The event.
   */
  onHandleDialog(event: Event) {
    this.dialog.close('assignedTo');
    stopPropagation(event);
  }

  /**
   * Switches the category menu on click.
   */
  onSwitchMenu() {
    this.dialog.switch(this.dialogId);
  }

  /**
   * Provides the source path of the arrow.
   * @returns - The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialog.getArrowSrc(this.dialogId);
  }

  /**
   * Selects the category item on click.
   * @param element - The category item.
   */
  onSelect(element: HTMLDivElement) {
    this.value = element.innerText;
    this.dialog.close(this.dialogId);
    this.valueChange.emit(this.value);
  }
}
