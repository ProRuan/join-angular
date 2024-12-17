import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-input.component.html',
  styleUrl: './category-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, CategoryInputComponent),
    getProvider(NG_VALUE_ACCESSOR, CategoryInputComponent),
  ],
})
export class CategoryInputComponent extends BasicInput {
  catData: CategoryService = inject(CategoryService);

  // input value?!
  task: any;

  // double code!!!
  switchCategory() {
    if (!this.catData.opened) {
      this.catData.set(true);
    } else {
      this.catData.set(false);
    }
  }

  // double code!!!
  updateArrowCategory() {
    if (this.catData.opened) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  setCategory(element: HTMLDivElement) {
    this.task.category = element.innerText;
    this.catData.set(false);
  }
}
