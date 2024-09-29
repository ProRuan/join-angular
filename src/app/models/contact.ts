export class Contact {
  initials?: string;
  name: string;
  email: string;
  phone?: string;
  bgColor?: string;

  // add optional parameter!!!
  constructor() {
    this.initials = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.bgColor = '';
  }

  getInitials() {}

  // formatPhone() {}

  setBgColor() {}

  // name: string;
  // email: string;
  // phone: string;

  // constructor() {
  //   this.name = 'name';
  //   this.email = 'email';
  //   this.phone = 'number';
  // }
}
