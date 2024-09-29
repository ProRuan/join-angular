export class Subtask {
  text: string;
  done: boolean;
  focused: boolean;

  // add optional paramter!!!
  // activate methods!!!
  constructor() {
    this.text = '';
    this.done = false;
    this.focused = false;
  }

  // do(value?: boolean) {
  //   this.done = !value ? true : value;
  // }

  // focus(value?: boolean) {
  //   this.focused = !value ? true : value;
  // }
}
