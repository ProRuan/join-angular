import { ButtonData } from '../interfaces/button-data';

export class JoinButton {
  [key: string]: any;
  buttonClass: string = 'create-btn';
  textClass: string = 'create-btn-text';
  text: string = 'Create Task';
  imgClass: string = 'create-btn-img';
  src: string = '/assets/img/add-task/create_button.png';
  alt: string = 'create_button';

  // create default button (to show the default) ... ?

  set(data: ButtonData) {
    for (const [key] of Object.entries(this)) {
      this[key] = data[key];
    }
  }
}
