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
  singleClick: boolean = false;
  lastClick: any;
  lastTimeout: any;

  constructor() {}

  set(i: number, value: boolean) {
    this.subtasks[i].focused = value;
    this.currIndex = i;
    this.currValue = this.subtasks[i].text;
    console.log('curr value: ', this.currValue);
  }

  add(text: string) {
    let subtask = {
      text: text,
      done: false,
      focused: false,
    };
    this.subtasks.push(subtask);
    console.log('all subtasks: ', this.subtasks);
  }

  edit(i: number) {
    this.resetFocus();
    if (this.singleClick) {
      this.singleClick = false;
      this.set(i, true);
      clearTimeout(this.lastTimeout);
      if (window.getSelection()) {
        window.getSelection()?.removeAllRanges();
      }
    }
    if (!this.singleClick) {
      this.singleClick = true;
      this.lastClick = new Date().getTime();
      this.lastTimeout = setTimeout(() => {
        this.singleClick = false;
      }, 250);
    }
  }

  delete() {
    console.log('currIndex of subtasks: ', this.currIndex);
    if (this.currIndex > -1) {
      this.subtasks.splice(this.currIndex, 1);
      this.currIndex = -1;
    }
  }

  save(i: number) {
    if (this.subtasks[i]) {
      this.subtasks[i].focused = false;
      this.subtasks[i].text = this.currValue;
      // console.log('curr value: ', this.subtasks[i].text);
    }
  }

  resetFocus() {
    this.subtasks.forEach((subtask) => {
      subtask.focused = false;
    });
  }
}
