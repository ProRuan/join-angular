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
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Task } from '../../shared/models/task';
import { Contact } from '../../shared/models/contact';
import { Subtask } from '../../shared/models/subtask';
import { getItems, loadUser } from '../../shared/ts/global';

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
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})

/**
 * Represents an add-task component.
 */
export class AddTaskComponent {
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);

  title: string = 'Add Task';
  task: Task = new Task();
  assignedContacts: Contact[] = [];

  get contacts() {
    return this.join.user.contacts;
  }

  set contacts(contacts: Contact[]) {
    this.join.user.contacts = contacts;
  }

  // assigned-to input component
  // ---------------------------
  // 2. Reset assign-to form ... !
  // *. board task: (contact.assigned &&) contact.tasks.includes(this.task)

  // CategoryInputComponent
  // ----------------------
  // set transition of all inputs (especially drop-down menu)!!!!

  // move add-task input to add-task ... !
  // clean add-task component ...

  // SubtasksInputComponent
  // ----------------------
  // plus Style
  // ----------
  // position:absolute, because height is changing + stop(event)!!!
  // set subtask cont height limit?!

  // getObject() + taskRef/contactsRef ... ?! (1/2)

  // --------------------------------------------------------------

  // BoardComponent
  // --------------
  // create sample tasks ...

  // onFocus and onBlur OR onFocusChange: verfiy event type?!F

  ngOnInit() {
    this.loadUser();
    console.log('add task user: ', this.join.user);

    // if (this.join.user.email !== undefined) {
    //   console.log('add task user: ', this.join.user);
    // }
  }

  loadUser() {
    let user = loadUser();
    if (user) {
      this.join.user = user;
      console.log('join user contacts: ', this.join.user.contacts);
    }
  }

  onResetForm(ngForm: NgForm) {
    ngForm.reset();

    // reset assignedTo list + profiles ...
    // reset due date ...
    // reset prio ...
    // reset category ...
    // reset subtasks ...
  }

  // add task to user!!!
  async onAddTask(ngForm: NgForm) {
    if (ngForm.form.valid) {
      console.log('title: ', this.task.title);
      console.log('due date: ', this.task.dueDate);
      console.log('catecory: ', this.task.category);
      this.join.user.tasks.push(this.task);
      console.log('user tasks: ', this.join.user.tasks);
      console.log('submitted task: ', this.task);

      // let convertedUser = this.join.user.getObject();
      // // let summary = this.join.user.summary;
      // console.log('summary: ', convertedUser.summary);

      // await this.join.updateUser(
      //   this.join.user.id,
      //   'data.summary',
      //   convertedUser.summary
      // );

      // keep ids after converting!!!
      let tasks = getItems(this.join.user.tasks, Task);
      console.log('converted user tasks: ', tasks);

      // let convertedUser = this.join.user.getObject();
      // console.log('converted user: ', convertedUser);

      this.task = new Task();
      console.log('task emptied; ', this.task);

      // assignedTo not working yet ...
      // subtasks not working yet ...

      // deletes task after reload --> update user!!!
      await this.join.updateUser(
        this.join.user.id,
        'data.tasks',
        tasks
        // convertedUser.tasks
      );
    } else {
      console.log('form invalid');
    }
  }

  /**
   * Sets the task property on change.
   * @param key - The key of the task property.
   * @param value - The value to set.
   */
  onSetTask(key: string, value: string | Contact[] | Subtask[]) {
    this.task[key] = value;
  }
}
