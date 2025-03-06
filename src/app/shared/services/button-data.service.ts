import { Injectable } from '@angular/core';
import { ButtonData } from '../interfaces/button-data';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a button data service.
 */
export class ButtonDataService {
  [key: string]: any;

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

  deleteBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Delete',
    imgClass: 'img-24 delete',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  editBtn: ButtonData = {
    buttonClass: 'settings-btn',
    textClass: 'settings-btn-text',
    text: 'Edit',
    imgClass: 'img-24 edit',
    src: '/assets/img/contacts/edit.png',
    alt: 'edit',
  };

  addBtn: ButtonData = {
    buttonClass: 'create-btn add-new-contact-btn',
    textClass: 'create-btn-text',
    text: 'Add new contact',
    imgClass: 'img-32',
    src: '/assets/img/contacts/add_new_contact.png',
    alt: 'add_new_contact',
  };

  deleteContactBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Delete',
    imgClass: 'delete-btn-img',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };
}
