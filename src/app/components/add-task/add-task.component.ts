import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  mainComponent: MainComponent = inject(MainComponent);
  sessionToken: string = '';
  codes: string[] = [];

  user: User = new User();
  task = new Task();
  prio = {
    urgent: false,
    medium: true,
    low: false,
  };
  // Please review!!!

  // title - check
  // description - check
  // assignedTo ...
  // dueDate - semiCheck
  // prio - semiCheck
  // category ...
  // subtasks ...

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
  }

  setPrio(prio: any) {
    this.prio.urgent = prio.id == 'urgent' ? true : false;
    this.prio.medium = prio.id == 'medium' ? true : false;
    this.prio.low = prio.id == 'low' ? true : false;

    this.task.prio = prio.id;
    console.log('task prio: ', this.task.prio);
    if (this.user.tasks) {
      this.user.tasks[0].prio = prio.id;
    }
    console.log('add task user: ', this.user.tasks);
  }

  resetForm(ngForm: NgForm) {
    ngForm.reset();
  }

  // add task to user!!!
  addTask(ngForm: NgForm) {
    if (ngForm.form.valid) {
      console.log('add task: ', this.task);
    } else {
      console.log('not valid');
    }
  }
}
