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

  updatePassword(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '!@#$%^&*';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    console.log('key: ', key);
    console.log('temp key: ', tempKey);
    let allowedKeys = [
      'home',
      'end',
      'insert',
      'delete',
      'backspace',
      'tab',
      'capslock',
      'shift',
      'control',
      'meta',
      'alt',
      'altgraph',
      'arrowleft',
      'arrowright',
    ];

    let input = event.target as HTMLInputElement;

    clearTimeout(this.agentTimeout);

    if (!charSet.has(tempKey) && !allowedKeys.includes(tempKey)) {
      keyboard.preventDefault();
    }

    setTimeout(() => {
      // this.passwordAgent = this.password;
      this.passwordAgent = '';
      for (let i = 0; i < this.password.length; i++) {
        if (i != this.password.length - 1) {
          this.passwordAgent += `\u25CF`;
        } else if (
          charSet.has(tempKey) &&
          input.selectionStart == this.password.length
        ) {
          this.passwordAgent += this.password[i];
          this.agentTimeout = setTimeout(() => {
            this.passwordAgent = this.passwordAgent.replace(/.$/, '\u25CF');
          }, 250);
        } else {
          this.passwordAgent += '\u25CF';
        }
      }
      console.log('password: ', this.password);
      console.log('password agent: ', this.passwordAgent);
    }, 0);
  }

  logVisibility(event: Event) {
    console.log('visibility: ', event);
    if (event) {
      this.visibility = true;
      // this.passwordCache = this.passwordAgent;
      // this.passwordAgent = this.password;
    } else {
      this.visibility = false;
      // this.passwordAgent = this.passwordCache;
    }
  }

  hidePasswortAgent() {
    return this.visibility ? 'password-agent-plus' : '';
  }

  updatePassword2(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '!@#$%^&*';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    console.log('key: ', key);
    console.log('temp key: ', tempKey);
    let allowedKeys = [
      'home',
      'end',
      'insert',
      'delete',
      'backspace',
      'tab',
      'capslock',
      'shift',
      'control',
      'meta',
      'alt',
      'altgraph',
      'arrowleft',
      'arrowright',
    ];

    let input = event.target as HTMLInputElement;

    clearTimeout(this.agentTimeout2);

    if (!charSet.has(tempKey) && !allowedKeys.includes(tempKey)) {
      keyboard.preventDefault();
    }

    setTimeout(() => {
      // this.passwordAgent2 = this.confirmedPassword;
      this.passwordAgent2 = '';
      for (let i = 0; i < this.confirmedPassword.length; i++) {
        if (i != this.confirmedPassword.length - 1) {
          this.passwordAgent2 += `\u25CF`;
        } else if (
          charSet.has(tempKey) &&
          input.selectionStart == this.confirmedPassword.length
        ) {
          this.passwordAgent2 += this.confirmedPassword[i];
          this.agentTimeout2 = setTimeout(() => {
            this.passwordAgent2 = this.passwordAgent2.replace(/.$/, '\u25CF');
          }, 250);
        } else {
          this.passwordAgent2 += '\u25CF';
        }
      }
      console.log('confirmed password: ', this.confirmedPassword);
      console.log('password agent 2: ', this.passwordAgent2);
    }, 0);
  }

  logVisibility2(event: Event) {
    console.log('visibility: ', event);
    if (event) {
      this.visibility2 = true;
      // this.passwordCache = this.passwordAgent;
      // this.passwordAgent = this.password;
    } else {
      this.visibility2 = false;
      // this.passwordAgent = this.passwordCache;
    }
  }

  hidePasswortAgent2() {
    return this.visibility2 ? 'password-agent-plus' : '';
  }

  validatePasswordChar(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '!@#$%^&*';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    console.log('key: ', key);
    console.log('temp key: ', tempKey);

    // // Check if "Control + A" is pressed to allow select all
    if (event.ctrlKey && tempKey === 'a') {
      return; // Do not prevent default for "Control + A"
    }
    if (event.ctrlKey && tempKey === 'c') {
      return;
    }
    if (event.ctrlKey && tempKey === 'v') {
      return;
    }

    if (event.shiftKey) {
      let input = event.target as HTMLInputElement;
      console.log('input cursor start: ', input.selectionStart);
      console.log('input cursor end: ', input.selectionEnd);
      if (input.selectionStart) {
        this.selectionStart = input.selectionStart;
      }
      if (input.selectionEnd) {
        this.selectionEnd = input.selectionEnd;
      }
      keyboard.preventDefault();
    }

    if (tempKey == 'arrowleft') {
      let input = event.target as HTMLInputElement;
      console.log('input cursor start: ', input.selectionStart);
      console.log('input cursor end: ', input.selectionEnd);
      if (input.selectionStart) {
        this.selectionStart = input.selectionStart;
      }
      if (input.selectionEnd) {
        this.selectionEnd = input.selectionEnd;
      }
      // keyboard.preventDefault();
    }

    if (charSet.has(tempKey)) {
      clearTimeout(this.agentTimeout);
      this.passwordAgent = this.passwordAgent.replace(/.$/, '\u25CF');

      let input = event.target as HTMLInputElement;
      console.log('input cursor start: ', input.selectionStart);
      console.log('input cursor end: ', input.selectionEnd);
      if (input.selectionStart) {
        this.selectionStart = input.selectionStart;
      }
      if (input.selectionEnd) {
        this.selectionEnd = input.selectionEnd;
      }

      let temp = this.passwordCache;
      this.passwordCache = '';
      let temp1 = '';
      let temp2 = '';

      console.log('used selection start: ', input.selectionStart);
      if (input.selectionStart == 0) {
        temp1 = '';
        temp2 = temp;
      } else if (input.selectionStart == temp.length) {
        temp1 = temp;
        temp2 = '';
      } else {
        for (let i = 0; i < this.selectionStart; i++) {
          temp1 += temp[i];
        }
        for (let i = this.selectionStart; i < temp.length; i++) {
          temp2 += temp[i];
        }
      }
      console.log('TEMP: ', temp);
      console.log('TEMP1: ', temp1);
      console.log('TEMP2: ', temp2);
      this.passwordCache = temp1 + key + temp2;
      this.passwordAgent = '';
      for (let i = 0; i < this.passwordCache.length; i++) {
        this.passwordAgent += '\u25CF';
      }

      // this.passwordAgent += key;
      // this.passwordCache += key;
      this.password = this.passwordCache;

      this.agentTimeout = setTimeout(() => {
        this.passwordAgent = this.passwordAgent.replace(/.$/, '\u25CF');
        console.log('updated password agent: ', this.passwordAgent);
      }, 500);

      keyboard.preventDefault();
    }

    if (tempKey != 'arrowleft' && tempKey != 'shift') {
      let input = event.target as HTMLInputElement;
      console.log('cursor 0: ', this.selectionStart, input.selectionStart);
      if (input.selectionStart != null) {
        this.selectionStart = input.selectionStart + 1;
      }
      setTimeout(() => {
        input.setSelectionRange(this.selectionStart, this.selectionStart);
      }, 0);
    }
    // console.log('input cursor start: ', input.selectionStart);
    // console.log('input cursor end: ', input.selectionEnd);
    // if (input.selectionStart) {
    //   this.selectionStart = input.selectionStart;
    // }
    // if (input.selectionEnd) {
    //   this.selectionEnd = input.selectionEnd;
    // }

    console.log('password agent: ', this.passwordAgent);
    console.log('password cache: ', this.passwordCache);
    console.log('password: ', this.password);

    // // Check if "Control + A" is pressed to allow select all
    // if (event.ctrlKey && tempKey === 'a') {
    //   return; // Do not prevent default for "Control + A"
    // }
    // if (event.ctrlKey && tempKey === 'c') {
    //   return;
    // }
    // if (event.ctrlKey && tempKey === 'v') {
    //   return;
    // }

    // if (
    //   !charSet.has(tempKey) &&
    //   tempKey != 'backspace' &&
    //   tempKey != 'delete' &&
    //   tempKey != 'arrowleft' &&
    //   tempKey != 'arrowright' &&
    //   tempKey != 'tab'
    // ) {
    //   event.preventDefault();
    // } else {
    //   clearTimeout(this.agentTimeout);
    //   if (tempKey == 'backspace' || tempKey == 'delete') {
    //     if (this.passwordAgent.length > 0) {
    //       this.passwordAgent = this.passwordAgent.replace(/.$/, '');
    //     }
    //     if (this.passwordCache.length > 0) {
    //       this.passwordCache = this.passwordCache.replace(/.$/, '');
    //     }
    //   }
    //   this.passwordAgent = this.passwordAgent.replace(/.$/, '\u25CF');
    //   if (charSet.has(tempKey)) {
    //     this.passwordCache += key;
    //     this.passwordAgent += key;
    //     this.agentTimeout = setTimeout(() => {
    //       this.passwordAgent = this.passwordAgent.replace(/.$/, '\u25CF');
    //       console.log('updated password agent: ', this.passwordAgent);
    //     }, 500);
    //     // this.passwordAgent += '\u25CF';
    //   }
    //   console.log('password agent: ', this.passwordAgent);
    //   console.log('password cache: ', this.passwordCache);
    //   if (tempKey == 'arrowleft') {
    //     let input = event.target as HTMLInputElement;
    //     if (input.selectionStart) {
    //       this.selectionStart = input.selectionStart - 1;
    //       console.log('curspor pos: ', this.selectionStart);
    //     }
    //   }
    //   if (tempKey == 'arrowright') {
    //     let input = event.target as HTMLInputElement;
    //     if (input.selectionStart) {
    //       this.selectionStart = input.selectionStart + 1;
    //       console.log('curspor pos: ', this.selectionStart);
    //     }
    //   }
    //   if (
    //     tempKey != 'tab' &&
    //     tempKey != 'arrowleft' &&
    //     tempKey != 'arrowright'
    //   ) {
    //     event.preventDefault();
    //   }
    //   this.password = this.passwordCache;
  }

  preventCopyPaste(event: Event): void {
    let clipboard = event as ClipboardEvent;
    clipboard.clipboardData?.setData('text', '');
    event.preventDefault();
  }

  updatePasswordCache(event: KeyboardEvent) {
    let keyboard = event as KeyboardEvent;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    if (
      this.passwordCache.length > this.passwordAgent.length &&
      (tempKey == 'backspace' || tempKey == 'delete')
    ) {
      if (this.selectionStart == this.selectionEnd) {
        this.passwordCache = this.passwordCache.replace(
          this.passwordCache[this.selectionStart - 1],
          ''
        );
        this.password = this.passwordCache;
      } else {
        let temp = this.passwordCache;
        this.passwordCache = '';
        for (let i = 0; i < this.selectionStart; i++) {
          this.passwordCache += temp[i];
        }
        for (let i = this.selectionEnd; i < temp.length; i++) {
          this.passwordCache += temp[i];
        }
        this.password = this.passwordCache;
      }
    }

    if (event && this.passwordCache.length > this.passwordAgent.length) {
      let temp = this.passwordCache;
      this.passwordCache = '';
      for (let i = 0; i < this.passwordAgent.length; i++) {
        this.passwordCache += temp[i];
      }
      this.password = this.passwordCache;
    }

    // get cursor position of keydown!
    let input = event.target as HTMLInputElement;
    console.log('input cursor start: ', input.selectionStart);
    console.log('input cursor end: ', input.selectionEnd);

    console.log('updated password agent: ', this.passwordAgent);
    console.log('updated password cache: ', this.passwordCache);
    console.log('updated password: ', this.password);
  }

  onPaste(event: ClipboardEvent) {
    if (event.clipboardData) {
      // add or replace!?!
      this.password = event.clipboardData.getData('text');
      this.passwordCache = event.clipboardData.getData('text');

      this.passwordAgent = '';
      for (let i = 0; i < this.passwordCache.length; i++) {
        this.passwordAgent += '\u25CF';
      }
      // this.passwordAgent = event.clipboardData.getData('text');
      event.preventDefault();
    }
  }

  validatePasswordChar2(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '!@#$%^&*';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    console.log('key: ', key);
    console.log('temp key: ', tempKey);

    // Check if "Control + A" is pressed to allow select all
    if (event.ctrlKey && tempKey === 'a') {
      return; // Do not prevent default for "Control + A"
    }
    if (event.ctrlKey && tempKey === 'c') {
      return;
    }
    if (event.ctrlKey && tempKey === 'v') {
      return;
    }

    if (
      !charSet.has(tempKey) &&
      tempKey != 'backspace' &&
      tempKey != 'delete' &&
      tempKey != 'arrowleft' &&
      tempKey != 'arrowright' &&
      tempKey != 'tab'
    ) {
      event.preventDefault();
    } else {
      clearTimeout(this.agentTimeout);
      if (tempKey == 'backspace' || tempKey == 'delete') {
        if (this.passwordAgent2.length > 0) {
          this.passwordAgent2 = this.passwordAgent2.replace(/.$/, '');
        }
        if (this.passwordCache2.length > 0) {
          this.passwordCache2 = this.passwordCache2.replace(/.$/, '');
        }
      }
      this.passwordAgent2 = this.passwordAgent2.replace(/.$/, '\u25CF');
      if (charSet.has(tempKey)) {
        this.passwordCache2 += key;
        this.passwordAgent2 += key;
        this.agentTimeout = setTimeout(() => {
          this.passwordAgent2 = this.passwordAgent2.replace(/.$/, '\u25CF');
          console.log('updated password agent: ', this.passwordAgent2);
        }, 500);
        // this.passwordAgent2 += '\u25CF';
      }
      console.log('password agent: ', this.passwordAgent2);
      console.log('password cache: ', this.passwordCache2);
      if (
        tempKey != 'tab' &&
        tempKey != 'arrowleft' &&
        tempKey != 'arrowright'
      ) {
        event.preventDefault();
      }
      this.confirmedPassword = this.passwordCache2;
    }
  }

  onPaste2(event: ClipboardEvent) {
    if (event.clipboardData) {
      // add or replace!?!
      this.confirmedPassword = event.clipboardData.getData('text');
      this.passwordCache2 = event.clipboardData.getData('text');

      this.passwordAgent2 = '';
      for (let i = 0; i < this.passwordCache.length; i++) {
        this.passwordAgent2 += '\u25CF';
      }
      // this.passwordAgent2 = event.clipboardData.getData('text');
      event.preventDefault();
    }
  }

  isInvalidPassword() {
    let password = this.val.getPassword(this.password);
    let passwordValid = new PasswordVal(this.password).ok;
    if (password.length < 8 || !passwordValid) {
      return true;
    } else {
      return false;
    }
  }

  getPasswordHint() {
    // let blackCircle: string = '\u25CF';
    // console.log(blackCircle); // Output: ●
    // this.password =
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle;

    if (this.password.length > 7) {
      if (!/[A-Z]/.test(this.password)) {
        return 'Use at least 1 capital letter.';
      } else if (!/[a-z]/.test(this.password)) {
        return 'Use at least 1 small letter';
      } else if (!/\d/.test(this.password)) {
        return 'Use at least 1 digit.';
      } else {
        return 'Use at least 1 special character.';
      }
    } else {
      return 'Enter at least 8 characters';
    }
  }

  isPwMismatch() {
    let password = new PasswordVal(this.password).ok;
    if (password && this.password != this.confirmedPassword) {
      return true;
    } else {
      return false;
    }
  }

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
