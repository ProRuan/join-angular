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
import { loadUser } from '../../shared/ts/global';

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
  // from user!
  task: Task = new Task();
  // from user + create sample tasks, sample contacts, sample subtasks!
  assignableContacts: Contact[] = [
    {
      initials: 'PM',
      bgc: 'cyan',
      name: 'Peter Müller',
      email: 'mueller@mail.com',
      phone: '+49 1111 111 11 1',
      tasks: [],
    },
    {
      initials: 'AS',
      bgc: 'purple',
      name: 'Anja Schulz',
      email: 'schulz@mail.com',
      phone: '+49 2222 222 22 2',
      tasks: [],
    },
    {
      initials: 'EF',
      bgc: 'yellow',
      name: 'Eva Fischer',
      email: 'fischer@mail.com',
      phone: '+49 3333 333 33 3',
      tasks: [],
    },
  ];
  assignedContacts: Contact[] = [];

  get contacts() {
    return this.join.user.contacts;
  }

  set contacts(contacts: Contact[]) {
    this.join.user.contacts = contacts;
  }

  // assigned-to input component
  // ---------------------------
  // 1. Implement user contacts ...
  //      - user on the top ...
  //      - user with (You) ...
  // 2. Reset assign-to form ... !
  // *. board task: (contact.assigned &&) contact.tasks.includes(this.task)

  // CategoryInputComponent
  // ----------------------
  // set transition of all inputs (especially drop-down menu)!!!!

  // move add-task input to add-task ... !
  // clean add-task component ...

  // SubtasksInputComponent
  // ----------------------
  // create default tasks
  // create default contacts
  // create default subtasks
  // plus Style
  // ----------
  // position:absolute, because height is changing + stop(event)!!!
  // set subtask cont height limit?!

  // onFocus and onBlur OR onFocusChange: verfiy event type?!

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
      this.join.user.contacts = this.assignableContacts;
      console.log('join user: ', this.join.user);
    }
  }

  onResetForm(ngForm: NgForm) {
    ngForm.reset();
    // reset prio!!!
    // this.prio.reset();
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

      this.task = new Task();
      console.log('task emptied; ', this.task);
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
