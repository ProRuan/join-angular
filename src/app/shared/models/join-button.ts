import { inject } from '@angular/core';
import { ButtonData } from '../interfaces/button-data';
import { ButtonDataService } from '../services/button-data.service';

export class JoinButton {
  buttons: ButtonDataService = inject(ButtonDataService);

  [key: string]: any;
  buttonClass: string = 'create-btn';
  textClass: string = 'create-btn-text';
  text: string = 'Create Task';
  imgClass: string = 'create-btn-img';
  src: string = '/assets/img/add-task/create_button.png';
  alt: string = 'create_button';

  // create default button (to show the default) ... ?

  constructor(id?: string) {
    if (id) {
      this.set(this.buttons[id]);
    }
  }

  // replace all with contructor!!!
  set(data: ButtonData) {
    for (const [key] of Object.entries(this)) {
      this[key] = data[key];
    }
  }
}
