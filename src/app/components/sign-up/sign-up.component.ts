import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import {
  nameVal,
  emailVal,
  passwordVal,
} from '../../shared/services/input-validation.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LogoComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    CheckboxComponent,
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

  name: string = '';
  email: string = '';
  password: string = '';
  matchword: string = '';
  namePat: RegExp = nameVal.namePat;
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
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

  // fix validation letter + control/alt/altshift
  // move to the top!!!
  async onSignUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.name = nameVal.getUserName(this.name);
      this.email = emailVal.getEmail(this.email);
      this.password = passwordVal.getPassword(this.password);
      console.log('signee: ', this.name, this.email, this.password);

      this.user.name = this.name;
      this.user.email = this.email;
      this.user.password = this.password;

      let userData = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      console.log('user data: ', userData);

      let userDoc = {
        id: '',
        data: userData,
      };
      console.log('user doc: ', userDoc);

      // await this.createUser();

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
   * Accepts the privacy policy on click.
   * @param checked - True or false.
   */
  onAccept(checked: boolean) {
    this.ppAccepted = checked;
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
  // get token of logged in user
  // set user data of logged in user
  // avoid blinking
}
