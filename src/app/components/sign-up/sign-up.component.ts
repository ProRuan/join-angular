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

  /**
   * Redirects to the login.
   */
  onBackToLogin() {
    this.router.navigateByUrl('login');
    this.join.setIntroDone();
  }

  /**
   * Validates the name on keydown.
   * @param event - The keyboard event.
   */
  onValidateName(event: KeyboardEvent) {
    this.val.validateInput(event, 'name');
  }

  /**
   * Verifies the invalidity of the name.
   * @returns - A boolean value.
   */
  isNameInvalid() {
    return this.val.isInvalidName(this.name);
  }

  /**
   * Provides the name hint.
   * @returns - The name hint.
   */
  getNameHint() {
    return this.val.nameHint;
  }

  /**
   * Validates the email on keydown.
   * @param event - The keyboard event.
   */
  onValidateEmail(event: KeyboardEvent) {
    this.val.validateInput(event, 'email');
  }

  /**
   * Verifies the invalidity of the email.
   * @returns - A boolean value.
   */
  isEmailInvalid() {
    return this.val.isEmailInvalid(this.email);
  }

  /**
   * Provides the email hint.
   * @returns - The email hint.
   */
  getEmailHint() {
    return this.val.emailHint;
  }

  /**
   * Verifies the invalidity of the password.
   * @returns - A boolean value.
   */
  isInvalidPassword() {
    return this.val.isInvalidPassword(this.password);
  }

  /**
   * Provides the password hint.
   * @returns - The password hint.
   */
  getPasswordHint() {
    return this.val.getPasswordHint(this.password);
  }

  // jsdoc
  getPasswordPat() {
    if (this.password.match(this.passwordPat)) {
      return new RegExp(this.password);
    } else {
      return this.passwordPat;
    }
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

  // fix control, shift, alt etc.!!!
  // fix confirmedPassword hint!!!
  // review service masker!!!

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

  isWaiting() {
    let passwordOk = new PasswordVal(this.password).ok;
    return !passwordOk ? true : false;
  }

  // move to the top!!!
  async onSignUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.name = this.val.getName(this.name);
      this.email = this.val.getEmail(this.email);
      this.password = this.val.getPassword(this.password);
      this.confirmedPassword = this.val.getPassword(this.confirmedPassword);
      console.log('signee: ', this.name, this.email, this.password);

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

  /**
   * Provides the check.
   * @returns - The css class to apply.
   */
  getCheck() {
    return this.ppAccepted ? 'checked' : 'check';
  }

  /**
   * Checks the checkbox on accept.
   */
  onAccept() {
    this.ppAccepted = !this.ppAccepted ? true : false;
  }

  /**
   * Verifies the disabled state of the sign-up-btn.
   * @param ngForm - The ngForm.
   * @returns - A boolean value.
   */
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
