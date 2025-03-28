import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { TitleInputComponent } from '../../shared/components/inputs/title-input/title-input.component';
import { DescriptionInputComponent } from '../../shared/components/inputs/description-input/description-input.component';
import { AssignedToInputComponent } from '../../shared/components/inputs/assigned-to-input/assigned-to-input.component';
import { DueDateInputComponent } from '../../shared/components/inputs/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../shared/components/inputs/prio-input/prio-input.component';
import { CategoryInputComponent } from '../../shared/components/inputs/category-input/category-input.component';
import { SubtasksInputComponent } from '../../shared/components/inputs/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormController } from '../../shared/models/form-controller';
import { Router } from '@angular/router';
import { JoinService } from '../../shared/services/join.service';
import { ButtonDataService } from '../../shared/services/button-data.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Contact } from '../../shared/models/contact';
import { Task } from '../../shared/models/task';
import { JoinButton } from '../../shared/models/join-button';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
 * Class representing an add-task component.
 * @extends FormController
 */
export class AddTaskComponent extends FormController {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  buttons: ButtonDataService = inject(ButtonDataService);
  validators: InputValidatorService = inject(InputValidatorService);
  dialog: DialogService = inject(DialogService);

  @Input() original: boolean = true;

  title: string = 'Add Task';
  contacts: Contact[] = [];
  task: Task = new Task();
  search: AbstractControl | null = null;
  calendar: AbstractControl | null = null;
  subtask: AbstractControl | null = null;
  clearBtn = new JoinButton('clearBtn');
  createBtn = new JoinButton('createBtn');
  paddingClass: string = 'padding-desktop';
  columnClass: string = 'column-desktop';

  /**
   * Initializes an add-task component.
   */
  ngOnInit() {
    this.contacts = this.join.user.contacts;
    this.setForm();
    this.updateVersion();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.setTaskControls();
    this.setAssistantControls();
  }

  /**
   * Sets a form control for each task property.
   */
  setTaskControls() {
    this.registerControl('title', '', this.validators.required);
    this.registerControl('description', '');
    this.registerControl('assignedTo', []);
    this.registerControl('dueDate', '', this.validators.getDueDate(true));
    this.registerControl('prio', 'medium');
    this.registerControl('category', '', this.validators.required);
    this.registerControl('subtasks', []);
  }

  /**
   * Sets a form control for each assistant input.
   */
  setAssistantControls() {
    this.search = this.dialog.search;
    this.calendar = this.getControl('');
    this.subtask = this.getControl('');
  }

  /**
   * Updates the version of an add-task component.
   */
  updateVersion() {
    if (!this.original) {
      this.updateCSSClasses();
      this.updateClearBtn();
      this.updateCreateBtn();
    }
  }

  /**
   * Updates css classes.
   */
  updateCSSClasses() {
    this.paddingClass = 'padding-dialog';
    this.columnClass = 'column-dialog';
  }

  /**
   * Updates a clear button.
   */
  updateClearBtn() {
    this.clearBtn.text = 'Cancel';
    this.isClear = () => this.isNullified();
    this.onClear = () => this.cancel();
  }

  /**
   * Nullifies a method by returning false.
   * @returns False.
   */
  isNullified() {
    return false;
  }

  /**
   * Closes and clears an add-task dialog.
   */
  cancel() {
    this.dialog.close('addTask');
    this.clearForm();
  }

  /**
   * Clears a form.
   */
  clearForm() {
    this.resetForm();
    this.search?.reset('');
    this.calendar?.reset('');
    this.subtask?.reset('');
  }

  /**
   * Resets a form.
   */
  resetForm() {
    let defaultValues = this.getDefaultValues();
    this.form.reset(defaultValues);
  }

  /**
   * Gets form default values.
   * @returns The form default values.
   */
  getDefaultValues() {
    return {
      title: '',
      description: '',
      assignedTo: [],
      dueDate: '',
      prio: 'medium',
      category: '',
      subtasks: [],
    };
  }

  /**
   * Updates a create button.
   */
  updateCreateBtn() {
    this.onCreate = () => this.addTask();
  }

  /**
   * Adds a task.
   */
  addTask() {
    this.createTask();
    this.fadeDialogOut();
  }

  /**
   * Fades an add-task dialog out.
   */
  fadeDialogOut() {
    this.dialog.submitted = true;
    setTimeout(() => this.resetDialog(), 1000);
  }

  /**
   * Resets an add-task dialog.
   */
  resetDialog() {
    this.dialog.close('addTask');
    this.clearForm();
    this.dialog.submitted = false;
  }

  /**
   * Verifies the clear state of a form.
   * @returns A boolean value.
   */
  isClear() {
    return this.form.pristine;
  }

  /**
   * Clears a form on click.
   */
  onClear() {
    this.clearForm();
  }

  /**
   * Verifies the invalidity of a form.
   * @returns A boolean value.
   */
  isIncomplete() {
    return this.form.invalid;
  }

  /**
   * Creates a task on click.
   */
  onCreate() {
    this.createTask();
  }

  /**
   * Creates a task.
   */
  createTask() {
    if (this.form.valid) {
      this.task.set(this.form.value);
      this.join.addUserItem('tasks', this.task);
      this.join.updateSummary();
      this.join.saveUser();
      this.navigateToBoard();
    }
  }

  /**
   * Navigates to a board.
   */
  navigateToBoard() {
    let url = this.router.url.replace('add-task', 'board');
    this.router.navigateByUrl(url);
  }
}
