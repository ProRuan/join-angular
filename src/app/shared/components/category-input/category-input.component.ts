import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { DialogService } from '../../services/dialog.service';
import { stop } from '../../ts/global';

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

  id: string = 'category';

  /**
   * Handles the dialog on click.
   * @param event - The event.
   */
  onHandleDialog(event: Event) {
    this.dialog.close('assignedTo');
    stop(event);
  }

  /**
   * Switches the category menu on click.
   */
  onSwitchMenu(event: Event) {
    if (!this.dialog.isOpened(this.id)) {
      this.dialog.open(this.id);
    } else {
      this.dialog.close(this.id);
    }
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  override getSrc() {
    let directory = '../../../assets/img/add-task/';
    if (this.dialog.isOpened(this.id)) {
      return directory + 'drop_down_arrow_up.png';
    } else {
      return directory + 'drop_down_arrow_down.png';
    }
  }

  /**
   * Selects the category item on click.
   * @param element - The category item.
   */
  onSelect(element: HTMLDivElement) {
    this.value = element.innerText;
    this.dialog.close(this.id);
  }
}
