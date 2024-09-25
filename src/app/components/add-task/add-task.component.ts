import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { PrioButtonComponent } from '../../shared/components/prio-button/prio-button.component';
import { PrioService } from '../../shared/services/prio.service';
import { last } from 'rxjs';

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
  dueDate: any;
  currDate: string = new Date().toLocaleDateString();

  // Please review!!!

  // title - check
  // description - check
  // assignedTo ...
  // dueDate - semiCheck
  // icon, single digit (day, month), replace dot ... (0/3)
  // prio - check
  // category ...
  // subtasks ...

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
    this.formatCurrDate();
  }

  formatCurrDate() {
    // date validation
    let date = new Date('2023/10/32');
    console.log('date to validate: ', date);

    this.currDate = this.currDate.replaceAll('.', '/');
    let [day, month, year] = this.currDate.split('/');
    if (day.length < 2) {
      day = '0' + day;
    }
    if (month.length < 2) {
      month = '0' + month;
    }
    this.currDate = day + '/' + month + '/' + year;
    console.log('new Date: ', this.currDate);
  }

  updateCalender() {
    if (this.task.dueDate.length == 10) {
      let [day, month, year] = this.task.dueDate.split('/');
      this.dueDate = year + '-' + month + '-' + day;
      // console.log('date complete: ', this.dueDate);
      let validDate = new Date(`${year}/${month}/${day}`);
      if (validDate) {
        console.log('date validation: ', validDate.toLocaleDateString());
      }
    }
  }

  formatDueDate() {
    let [year, month, day] = this.dueDate.split('-');
    this.task.dueDate = day + '/' + month + '/' + year;
    // console.log('new due date: ', this.task.dueDate);
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
