import { Injectable } from '@angular/core';
import { ButtonData } from '../interfaces/button-data';

@Injectable({
  providedIn: 'root',
})
export class ButtonDataService {
  // improve classes and class names ...

  clearBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Clear',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  createBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Create Task',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  addTaskBtn: ButtonData = {
    buttonClass: 'create-btn slim',
    textClass: 'create-btn-text',
    text: 'Add task',
    imgClass: 'img-32',
    src: '/assets/img/board/add.png',
    alt: 'add',
  };

  constructor() {}
}
