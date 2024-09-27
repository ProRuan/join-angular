import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  subtasks = [
    {
      text: 'Contact Form',
      done: false,
      focused: false,
    },
    {
      text: 'Write Legal Imprint',
      done: false,
      focused: false,
    },
  ];
  currIndex: number = 0;
  currValue: string = '';

  constructor() {}

  set(i: number, value: boolean) {
    this.subtasks[i].focused = value;
    this.currIndex = i;
    this.currValue = this.subtasks[i].text;
    console.log('curr value: ', this.currValue);
  }

  save(i: number) {
    this.subtasks[i].focused = false;
    this.subtasks[i].text = this.currValue;
    console.log('curr value: ', this.subtasks[i].text);
  }

  resetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focused = false;
    });
  }
}
