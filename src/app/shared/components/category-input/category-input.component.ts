import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { stop } from '../../ts/global';
import { LabelComponent } from '../label/label.component';

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
export class CategoryInputComponent extends BasicInput {
  dialog: DialogService = inject(DialogService);

  id: string = 'category';

  // double code!!!
  switchCategory() {
    if (!this.dialog.isOpened(this.id)) {
      this.dialog.open(this.id);
    } else {
      this.dialog.close(this.id);
    }
  }

  // double code!!!
  updateArrowCategory() {
    if (this.dialog.isOpened(this.id)) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  setCategory(element: HTMLDivElement) {
    this.value = element.innerText;
    this.dialog.close(this.id);
  }
}
