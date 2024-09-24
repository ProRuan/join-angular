import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { PrioButtonComponent } from '../../shared/components/prio-button/prio-button.component';
import { PrioService } from '../../shared/services/prio.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, PrioButtonComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  mainComponent: MainComponent = inject(MainComponent);
  prioData: PrioService = inject(PrioService);
  sessionToken: string = '';
  codes: string[] = [];

  user: User = new User();
  task = new Task();
  // Please review!!!

  // title - check
  // description - check
  // assignedTo ...
  // dueDate - semiCheck
  // prio - check
  // category ...
  // subtasks ...

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
  }

  resetForm(ngForm: NgForm) {
    ngForm.reset();
    this.prioData.reset();
  }

  // add task to user!!!
  addTask(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.task.prio = this.prioData.prio;
      console.log('add task: ', this.task);
    } else {
      console.log('not valid');
    }
  }
}
