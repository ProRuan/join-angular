import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { ValidationService } from '../../shared/services/validation.service';
import { NameVal } from '../../shared/models/name-val';
import { EmailVal } from '../../shared/models/email-val';
import { PasswordVal } from '../../shared/models/password-val';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LogoComponent,
    InputComponent,
    FooterComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})

/**
 * Represents a sign-up component.
 */
export class SignUpComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  val: ValidationService = inject(ValidationService);

  name: string = '';
  email: string = '';
  password: string = '';
  passwordAgent: string = '';
  // rename!!!
  agentTimeout: any;
  passwordCache: string = '';
  confirmedPassword: string = '';
  passwordAgent2: string = '';
  agentTimeout2: any;
  passwordCache2: string = '';
  namePat: RegExp = new NameVal().namePat;
  emailPat: RegExp = new EmailVal().emailPat;
  passwordPat: RegExp = new PasswordVal().passwordPat;
  passwordHint: string = "Your passwords don't match. Please try again.";
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  // testing!!!
  visibility: boolean = false;
  visibility2: boolean = false;
  selectionStart: number = 0;
  selectionEnd: number = 0;

  // jsdoc
  get user() {
    return this.join.user;
  }

  // jsdoc
  get users() {
    this.join.getUsers();
    return this.join.users;
  }

  // jsdoc
  backToLogin() {
    this.router.navigateByUrl('login');
    this.setIntroDone();
  }

  // jsdoc
  setIntroDone() {
    if (!this.join.revealed) {
      this.join.revealed = true;
      this.join.relocated = true;
    }
  }

  // jsdoc
  getPasswordPat() {
    if (this.password.match(this.passwordPat)) {
      return new RegExp(this.password);
    } else {
      return this.passwordPat;
    }
  }

  validateNameChar(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    const allowedChars = chars + ' ' + '-';
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key.toLowerCase();
    console.log('key: ', key);

    if (
      !charSet.has(key) &&
      key != 'backspace' &&
      key != 'delete' &&
      key != 'arrowleft' &&
      key != 'arrowright' &&
      key != 'tab'
    ) {
      event.preventDefault();
    }
  }

  // very interesting!!!
  // validateNameChar(event: KeyboardEvent) {
  //   let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ';
  //   let lowerCase = 'abcdefghijklmnopqrstuvwxyzäöüß';
  //   let digits = '0123456789';
  //   let specialChar = '!@#$%^&*'; // for password!

  //   const nameChars = upperCase + lowerCase + digits + specialChar;
  //   const nameCharSet = new Set(nameChars);
  //   // const specialCharactersSet = new Set('!@#$%^&*()-_=+[]{}|;:,.<>?/`~');
  //   // const isSpecialCharacter = specialCharactersSet.has(char);

  //   let keyboard = event;
  //   if (keyboard) {
  //     let key = keyboard.key;
  //     const isNameChar = nameCharSet.has(key);
  //     if (isNameChar) {
  //       console.log('is name char: ', key);
  //     }
  //   }
  // }

  isNameInvalid() {
    let name = this.val.getName(this.name);
    if (name.length < 2) {
      return true;
    } else {
      return false;
    }
  }

  getNameHint() {
    return 'Enter at least 2 letters.';
  }

  validateEmailChar(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '_%+-@.';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key.toLowerCase();
    console.log('key: ', key);

    if (
      !charSet.has(key) &&
      key != 'backspace' &&
      key != 'delete' &&
      key != 'arrowleft' &&
      key != 'arrowright' &&
      key != 'tab'
    ) {
      event.preventDefault();
    }
  }

  isEmailInvalid() {
    let email = this.val.getEmail(this.email);
    if (email == '') {
      return true;
    } else {
      return false;
    }
  }

  getEmailHint() {
    return 'Enter a valid email.';
  }

  // update input component!!!
  isPwMismatch() {
    let password = new PasswordVal(this.password).ok;
    if (password && this.password != this.confirmedPassword) {
      return true;
    } else {
      return false;
    }
  }

  // update input component!!!
  getConfirmedPasswordHint() {
    let password = new PasswordVal(this.password).ok;
    let lengthMatch = this.password.length == this.confirmedPassword.length;
    let valueMatch = this.password == this.confirmedPassword;
    if (password && lengthMatch && !valueMatch) {
      return this.passwordHint;
    } else {
      return 'Confirm your password.';
    }
  }

  async signUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.name = this.val.getName(this.name);
      this.email = this.val.getEmail(this.email);
      this.password = this.val.getPassword(this.password);
      this.confirmedPassword = this.val.getPassword(this.confirmedPassword);

      // I. Verify if user (email) exists!
      // ---------------------------------
      // let signee = this.users.find((u) => (u.email = this.user.email));
      // if (signee) {
      //   console.log('User already exists!');
      // }
      // II. Verify passwords!
      // let test = new PasswordVal(this.user.password).getResult();
      // console.log('got pw validation: ', test);
      // III: Sign up!!!
      // ---------------
      // this.signedUp = true;
      // await this.createUser();
      // // myRouterService???
      // console.log('signed up successfully: ', this.user.sid);
      // this.router.navigateByUrl('login/' + this.user.sid);
    }
  }

  // jsdoc
  async createUser() {
    await this.join.addUser().then(() => this.join.subscribeUser());
    await this.join.setSecurityId();
  }

  // // rename + udpate user values with local values!!!
  // isPwMismatch() {
  //   return this.val.getPwMismatch(this.password, this.confirmedPassword);
  // }

  // verifyPassword() {
  //   let password1 = this.password.match(this.passwordPat);
  //   let password2 = this.confirmedPassword.match(this.passwordPat);
  //   let matched = this.password != this.confirmedPassword;
  //   return password1 && password2 && matched ? true : false;
  // }

  // jsdoc
  getCheck() {
    return this.ppAccepted ? 'checked' : 'check';
  }

  // jsdoc
  accept() {
    this.ppAccepted = !this.ppAccepted ? true : false;
  }

  // jsdoc
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || !this.ppAccepted || this.signedUp;
  }

  // sign up
  // -------
  // classes
  // color variables
  // input error
  // password stars
  // secure form logic

  // input component

  // get token of logged in user
  // set user data of logged in user
  // avoid blinking

  // setInitials() {
  //   this.initials = '';
  //   let names = this.name.split(' ');
  //   if (names.length > 2) {
  //     let temp = names;
  //     names = [temp[0], temp[temp.length - 1]];
  //   }
  //   for (let i = 0; i < names.length; i++) {
  //     let initial = names[i][0];
  //     this.initials += initial;
  //   }
  // }
}
