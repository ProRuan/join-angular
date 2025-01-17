import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { TitleInputComponent } from '../../shared/components/title-input/title-input.component';
import { DescriptionInputComponent } from '../../shared/components/description-input/description-input.component';
import { AssignedToInputComponent } from '../../shared/components/assigned-to-input/assigned-to-input.component';
import { DueDateInputComponent } from '../../shared/components/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../shared/components/prio-input/prio-input.component';
import { CategoryInputComponent } from '../../shared/components/category-input/category-input.component';
import { SubtasksInputComponent } from '../../shared/components/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { JoinService } from '../../shared/services/join.service';
import { SummaryService } from '../../shared/services/summary.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Task } from '../../shared/models/task';
import { ButtonData } from '../../shared/interfaces/button-data';
import { isDefaultString, isTrue } from '../../shared/ts/global';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TitleInputComponent,
    DescriptionInputComponent,
    AssignedToInputComponent,
    DueDateInputComponent,
    PrioInputComponent,
    CategoryInputComponent,
    SubtasksInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})

/**
 * Represents an add-task component.
 */
export class AddTaskComponent {
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  dialog: DialogService = inject(DialogService);

  title: string = 'Add Task';
  task: Task = new Task();
  dueDate: string = '';
  subtasks: string = '';

  clearBtn: ButtonData = {
    buttonClass: 'clear-btn',
    contClass: 'cont-49',
    textClass: 'clear-btn-text',
    text: 'Clear',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  createBtn: ButtonData = {
    buttonClass: 'create-btn',
    contClass: 'cont-122',
    textClass: 'create-btn-text',
    text: 'Create Task',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  /**
   * Provides the value of the assigned-to input.
   */
  get assignedTo() {
    return this.dialog.assignedTo;
  }

  /**
   * Sets the value of the assigned-to input.
   */
  set assignedTo(value: string) {
    this.dialog.assignedTo = value;
  }

  /**
   * Provides the user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  /**
   * Initializes an add-task component.
   */
  async ngOnInit() {
    await this.join.loadUser();
    this.join.subscribeUser();
  }

  /**
   * Creates a task on submit.
   * @param ngForm - The add-task form.
   */
  async onCreate(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.join.user.tasks.push(this.task);
      this.summary.update();
      await this.join.saveUser();
      this.clearForm();
    }
  }

  /**
   * Clears the form.
   */
  clearForm() {
    this.assignedTo = '';
    this.dueDate = '';
    this.subtasks = '';
    this.task = new Task();
  }

  /**
   * Verifies the clear state of the form.
   * @param ngForm - The add-task form.
   * @returns - A boolean value.
   */
  isClear(ngForm: NgForm) {
    let formPristine = this.isFormPristine(ngForm);
    let taskDefault = this.task.isDefault();
    return formPristine && taskDefault;
  }

  /**
   * Verifies the pristineness of the form.
   * @param ngForm - The add-task form.
   * @returns - A boolean value.
   */
  isFormPristine(ngForm: NgForm) {
    if (this.isDefaultForm()) {
      ngForm.control.markAsPristine();
      return ngForm.form.pristine;
    } else {
      return false;
    }
  }

  /**
   * Verifies the default form.
   * @returns - A boolean value.
   */
  isDefaultForm() {
    let defaultValues = this.getDefaultValues();
    return !defaultValues.includes(false);
  }

  /**
   * Provides the default values.
   * @returns - The default values.
   */
  getDefaultValues() {
    let assignedTo = isDefaultString(this.assignedTo);
    let dueDate = isDefaultString(this.dueDate);
    let subtasks = isDefaultString(this.subtasks);
    return [assignedTo, dueDate, subtasks];
  }

  /**
   * Clears the form on click.
   */
  onClear() {
    this.clearForm();
  }

  /**
   * Verifies the incompleteness of the form.
   * @param ngForm - The add-task form.
   * @returns - A boolean value.
   */
  isIncomplete(ngForm: NgForm) {
    return isTrue(ngForm.invalid);
  }
}
