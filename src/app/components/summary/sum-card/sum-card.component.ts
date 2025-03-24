import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToDoSvgComponent } from '../../../shared/components/svg/to-do-svg/to-do-svg.component';
import { DoneSvgComponent } from '../../../shared/components/svg/done-svg/done-svg.component';
import { RouterLink } from '@angular/router';
import { SummaryTask } from '../../../shared/models/summary-task';

@Component({
  selector: 'app-sum-card',
  standalone: true,
  imports: [CommonModule, ToDoSvgComponent, DoneSvgComponent, RouterLink],
  templateUrl: './sum-card.component.html',
  styleUrl: './sum-card.component.scss',
})

/**
 * Class representing a sum card component.
 */
export class SumCardComponent {
  cardContClass: string = '';
  cardClass: string = '';
  iconContained: boolean = false;
  iconContClass: string = '';
  taskInfoClass: string = '';
  categoryClass: string = '';
  categoryUrgent: boolean = false;

  @Input() task: SummaryTask = new SummaryTask();

  /**
   * Initializes a sum card component.
   */
  ngOnInit() {
    this.cardContClass = this.getCardClass('card-cont');
    this.cardClass = this.getCardClass('card');
    this.iconContained = this.isIconContained();
    this.iconContClass = this.getIconContClass();
    this.taskInfoClass = this.getTaskInfoClass();
    this.categoryClass = this.getCategoryClass();
    this.categoryUrgent = this.isCategory('Urgent');
  }

  /**
   * Gets the css class of a card.
   * @param className - The class name.
   * @returns The css class of the card.
   */
  getCardClass(className: string) {
    if (this.isCategory('Urgent')) {
      return `${className}-large`;
    } else if (this.isCategory('To-do') || this.isCategory('Done')) {
      return `${className}-medium`;
    } else {
      return `${className}-small`;
    }
  }

  /**
   * Verifies a task category.
   * @param category - The task category.
   * @returns A boolean value.
   */
  isCategory(category: string) {
    return this.task.category == category;
  }

  /**
   * Verifies a card containing an icon.
   * @returns A boolean value.
   */
  isIconContained() {
    let toDo = this.isCategory('To-do');
    let done = this.isCategory('Done');
    let urgent = this.isCategory('Urgent');
    return toDo || done || urgent;
  }

  /**
   * Gets the css class of an icon container.
   * @param className - The class name.
   * @returns The css class of the icon container.
   */
  getIconContClass() {
    let className = 'card-icon-cont';
    return this.isCategory('Urgent') ? `${className}-urgent` : className;
  }

  /**
   * Gets the css class of a task info.
   * @returns The css class of the task info.
   */
  getTaskInfoClass() {
    return !this.isIconContained() ? `mw-80` : '';
  }

  /**
   * Gets the css class of a category.
   * @returns The css class of the category.
   */
  getCategoryClass() {
    return this.isCategory('Urgent') ? 'category-urgent' : 'category';
  }
}
