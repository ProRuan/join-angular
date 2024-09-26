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
  contactsFocused: boolean = true;
  dueDate: any;
  currDate: string = new Date().toLocaleDateString();
  dateInvalid: boolean = false;
  dueDatePat = /([0-3]?[0-9])[\.\/]([0-1]?[0-9])[\.\/]([0-9]{4})/;

  assignableContacts = [
    {
      initials: 'SM',
      name: 'Sofia Müller',
      assigned: false,
    },
    {
      initials: 'AS',
      name: 'Anja Schulz',
      assigned: false,
    },
    {
      initials: 'EF',
      name: 'Eva Fischer',
      assigned: false,
    },
  ];

  // Please review!!!

  // title - check
  // description - check
  // assignedTo ...
  //   - array assignedContacts ...
  //   - subId ...
  // dueDate - check
  // prio - check
  // category ...
  // subtasks ...

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
    this.formatCurrDate();
  }

  getCheckbox(i: number) {
    return this.assignableContacts[i].assigned ? 'checked' : 'check';
  }

  getSrc(i: number) {
    if (this.assignableContacts[i].assigned) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  assign(i: number) {
    this.assignableContacts[i].assigned = !this.assignableContacts[i].assigned
      ? true
      : false;
    console.log('assignable contacts: ', this.assignableContacts);
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

  // to improve!!!
  updateCalender() {
    let dateCompleted = this.task.dueDate.match(this.dueDatePat);
    if (dateCompleted) {
      console.log('due date pattern: ', dateCompleted);
      let day = dateCompleted[1];
      let d = day;
      if (day.length == 1) {
        day = '0' + day;
      }
      let month = dateCompleted[2];
      let m = month;
      if (month.length == 1) {
        month = '0' + month;
      }
      let year = dateCompleted[3];
      let y = year;
      this.task.dueDate = `${day}/${month}/${year}`;
      this.dueDate = `${year}-${month}-${day}`;
      console.log('got task due date by pattern: ', this.task.dueDate);
      console.log('got due date by pattern: ', this.dueDate);

      let dateInput = `${parseInt(d)}.${parseInt(m)}.${y}`;
      let validDate = new Date(`${y}/${m}/${d}`);
      let dateMatch = dateInput == validDate.toLocaleDateString();
      if (validDate) {
        console.log('date input: ', dateInput);
        console.log('date validation: ', validDate.toLocaleDateString());
        console.log('date match: ', dateMatch);
      }
    }
  }

  showHint() {
    return this.dateInvalid ? 'o-1' : '';
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
