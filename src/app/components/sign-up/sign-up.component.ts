import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogComponent } from '../../shared/components/log/log.component';
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
    LogComponent,
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

  [key: string]: any;
  initials: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  matchword: string = '';
  namePat: RegExp = nameVal.namePat;
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  ppAccepted: boolean = false;
  signedUp: boolean = false;
  logKey: string = '';
  logged: boolean = false;
  sid: string = '';

  // move to the top!!!
  async onSignUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.signedUp = true;
      this.updateSignUpData();
      let data = this.getSigneeData();

      let users = await this.join.getUsers();
      let user = users.find((u) => u.email === this.email);
      if (user) {
        this.setLog(true, 'email');
        setTimeout(() => {
          this.setLog(false);
          this.signedUp = false;
        }, 1200);
      } else {
        this.setLog(true, 'signUp');

        await this.registerUser(data);
        console.log('signed up successfully: ', this.sid); // remove!!!

        setTimeout(() => {
          // double code!!!
          this.router.navigateByUrl('login/' + this.sid);
          this.join.setIntroDone();
        }, 1000);
      }
    }
  }

  /**
   * Sets the log.
   * @param value - A boolean value.
   * @param key - The key of the log text.
   */
  setLog(value: boolean, key?: string) {
    this.logKey = key ? key : this.logKey;
    this.logged = value;
  }

  // think about function sequence!!!
  // jsdoc + rename name --> subname and username --> name!!!
  updateSignUpData() {
    this.initials = nameVal.getInitials(this.name);
    this.name = nameVal.getUserName(this.name);
    this.email = emailVal.getEmail(this.email);
    this.password = passwordVal.getPassword(this.password);
  }

  /**
   * Provides the signee data.
   * @returns - The signee data.
   */
  getSigneeData() {
    return {
      data: {
        initials: this.initials,
        name: this.name,
        email: this.email,
        password: this.password,
      },
    };
  }

  /**
   * Registers the user.
   * @param data - The signee data.
   */
  async registerUser(data: any) {
    let id = await this.join.addUser(data);
    if (id) {
      this.join.subscribeUser(id);
      this.sid = await this.join.addSessionId(id);
    }
  }

  /**
   * Redirects to the login.
   */
  onBackToLogin() {
    this.router.navigateByUrl('login');
    this.join.setIntroDone();
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
}
