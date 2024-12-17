import { Component, Input } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-due-date-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './due-date-input.component.html',
  styleUrl: './due-date-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, DueDateInputComponent),
    getProvider(NG_VALUE_ACCESSOR, DueDateInputComponent),
  ],
})
export class DueDateInputComponent extends BasicInput {
  task: any;
  dueDate: any = '';
  currDate: string = new Date().toLocaleDateString();
  dateInvalid: boolean = false;
  dueDatePat = /([0-3]?[0-9])[\.\/]([0-1]?[0-9])[\.\/]([0-9]{4})/;

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
}
