import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { TitleInputComponent } from '../../shared/components/inputs/title-input/title-input.component';
import { DescriptionInputComponent } from '../../shared/components/inputs/description-input/description-input.component';
import { AssignedToInputComponent } from '../../shared/components/inputs/assigned-to-input/assigned-to-input.component';
import { DueDateInputComponent } from '../../shared/components/inputs/due-date-input/due-date-input.component';
// import { DueDateInputComponent } from '../../shared/components/due-date-input/due-date-input.component';
// import { PrioInputComponent } from '../../shared/components/prio-input/prio-input.component';
// import { CategoryInputComponent } from '../../shared/components/category-input/category-input.component';
// import { SubtasksInputComponent } from '../../shared/components/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { JoinService } from '../../shared/services/join.service';
import { SummaryService } from '../../shared/services/summary.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Simple } from '../../shared/interfaces/simple';
import { Task } from '../../shared/models/task';
import { ButtonData } from '../../shared/interfaces/button-data';
import { isDefaultString, isTrue } from '../../shared/ts/global';
import { FormController } from '../../shared/models/form-controller';
import { InputValidator } from '../../shared/models/input-validator';
import { InputValidatorService } from '../../shared/services/input-validator.service';

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
    // PrioInputComponent,
    // CategoryInputComponent,
    // SubtasksInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})

/**
 * Represents an add-task component.
 */
export class AddTaskComponent extends FormController {
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);
  summary: SummaryService = inject(SummaryService);
  dialog: DialogService = inject(DialogService);

  // DueDateInputComponent
  // ---------------------
  // pattern test instead of value match ... !
  //   --> improve name formatter ... !

  // calendarDate and inputDate ... !
  // prepare a second control (control array) ... ?

  // remove input transition ... ?

  // delete old add-task input components ... !
  // delete AssignableContactComponent ... !

  // set all control types (not any) ... !
  // set validator array as optional + update components ... !

  // control?.value or get('control') for login, sign-up and so on ... ?

  // TitleInputCommponent
  // --------------------
  // delete HintComponent ... ?
  // add-task inputs double style ... ?

  @Input() first: boolean = true;
  title: string = 'Add Task';
  task: Task = new Task();
  dueDate: AbstractControl | null = null;
  // dueDate: string = '';
  subtasks: string = '';

  classes: Simple = {
    'add-task': 'add-task-desktop',
    cont: 'cont-desktop',
  };

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

  // new!!!
  taskTitle: AbstractControl | null = null;
  description: AbstractControl | null = null;
  // assignedTo: AbstractControl | null = null;
  assignees: AbstractControl | null = null;
  validator = new InputValidator(); // necessary???

  get assignedToNew() {
    return this.dialog.assignedToNew;
  }

  set assignedToNew(value: any) {
    this.dialog.assignedToNew?.setValue(value);
  }

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
    this.setForm();
    this.setControls();

    if (!this.first) {
      this.setDialogDesign();
      this.setClearBtn();
      this.setCreateBtn();
    }
  }

  // set subform?!
  setForm() {
    this.registerControl('title', '', [this.validator.required()]);
    this.registerControl('description', '', []);
    this.registerControl('assignees', [], []); // any value on form controller!!!
    this.registerControl('due-date', '', this.validators.dueDate); // add validators!!!

    // assistant controls!!!
    this.dueDate = this.getControl('', []); // exchange controls (value and dueDate)!!!
  }

  setControls() {
    this.taskTitle = this.get('title');
    this.assignees = this.get('assignees');
  }

  /**
   * Sets the dialog design.
   */
  setDialogDesign() {
    this.setCSSClass('add-task');
    this.setCSSClass('cont');
  }

  /**
   * Sets the css class.
   * @param className - The class name.
   */
  setCSSClass(className: string) {
    this.classes[className] = `${className}-dialog`;
  }

  /**
   * Sets the clear button.
   */
  setClearBtn() {
    this.clearBtn.contClass = 'cont-63';
    this.clearBtn.text = 'Cancel';
    this.isClear = () => this.isNullified();
    this.onClear = () => this.cancel();
  }

  /**
   * Nullifies the method by returning false.
   * @returns - False.
   */
  isNullified() {
    return false;
  }

  /**
   * Closes and clears the add-task dialog.
   */
  cancel() {
    this.dialog.closeDialog('addTask');
    this.clearForm();
  }

  /**
   * Clears the form.
   */
  clearForm() {
    this.assignedTo = '';
    this.dueDate?.setValue('');
    this.subtasks = '';
    this.task = new Task();
  }

  /**
   * Sets the create button.
   */
  setCreateBtn() {
    this.onCreate = () => this.addTask();
  }

  /**
   * Adds a task.
   */
  async addTask() {
    await this.createTask();
    this.dialog.closeDialog('addTask');
    this.clearForm();
  }

  /**
   * Creates a task on submit.
   */
  async onCreate() {
    console.log('form valid: ', this.form.valid);
    console.log('form: ', this.form);
    console.log('due date calendar: ', this.dueDate);

    // await this.createTask(ngForm);
  }

  /**
   * Creates a task.
   */
  async createTask() {
    if (this.form.valid) {
      this.join.user.tasks.push(this.task);
      this.summary.update();
      await this.join.saveUser();
    }
  }

  /**
   * Verifies the clear state of the form.
   * @returns - A boolean value.
   */
  isClear() {
    let formPristine = this.form.pristine;
    let taskDefault = this.task.isDefault();
    return formPristine && taskDefault;
  }

  /**
   * Verifies the pristineness of the form.
   * @returns - A boolean value.
   */
  isFormPristine() {
    if (this.isDefaultForm()) {
      this.form.markAsPristine();
      return this.form.pristine;
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
    let dueDate = isDefaultString(this.dueDate?.value); // review code!!!
    let subtasks = isDefaultString(this.subtasks);
    return [assignedTo, dueDate, subtasks];
  }

  /**
   * Clears the form on click.
   */
  onClear() {
    this.clearForm();
  }

  isIncomplete() {
    return this.form.invalid;
  }
}
