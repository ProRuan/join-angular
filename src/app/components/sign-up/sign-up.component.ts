import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { ValidationService } from '../../shared/services/validation.service';
// (re)move!!!
import { NameVal } from '../../shared/models/name-val';
import { EmailVal } from '../../shared/models/email-val';

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
  confirmedPassword: string = '';
  // update (2x)!!!
  namePat: RegExp = new NameVal().namePat;
  emailPat: RegExp = new EmailVal().emailPat;
  passwordPat: RegExp = this.val.getPattern('password');
  ppAccepted: boolean = false;
  signedUp: boolean = false;

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

  /**
   * Provides the password pattern.
   * @returns - The password pattern.
   */
  getPasswordPat() {
    if (this.val.isPasswordValid(this.password)) {
      return new RegExp(this.password);
    } else {
      return this.passwordPat;
    }
  }

  /**
   * Verifies the password mismatch.
   * @returns - A boolean value.
   */
  isPasswordMismatch() {
    let passwordValid = this.val.getValidPassword(this.password);
    return passwordValid && this.password != this.confirmedPassword;
  }

  /**
   * Provides the password match hint.
   * @returns - The hint to display.
   */
  getMatchHint() {
    if (this.isPasswordLonger()) {
      return 'This password is longer.';
    } else if (this.isPasswordWrong()) {
      return "Your passwords don't match. Please try again.";
    } else {
      return 'Confirm your password.';
    }
  }

  /**
   * Verifies the length of the confirmed password.
   * @returns - A boolean value.
   */
  isPasswordLonger() {
    return this.val.isPasswordLonger(this.password, this.confirmedPassword);
  }

  /**
   * Verifies the value of the confirmed password.
   * @returns - A boolean value.
   */
  isPasswordWrong() {
    return this.val.isPasswordWrong(this.password, this.confirmedPassword);
  }

  /**
   * Verifies the locked state of the confirm password input.
   * @returns - A boolean value.
   */
  isLocked() {
    return this.val.isPasswordValid(this.password);
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

  // fix control, shift, alt etc.!!!

  // sign up
  // -------
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
