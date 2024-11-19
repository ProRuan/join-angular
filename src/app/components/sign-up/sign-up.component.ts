import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogComponent } from '../../shared/components/log/log.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { IntroHeaderComponent } from '../../shared/components/intro-header/intro-header.component';
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
    IntroHeaderComponent,
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

  /**
   * Executes the sign-up on submit.
   * @param ngForm - The sign-up form.
   */
  async onSignUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.signedUp = true;
      this.updateSignUpData();
      await this.processSignUpData();
    }
  }

  /**
   * Updates the sign-up data.
   */
  updateSignUpData() {
    this.initials = nameVal.getInitials(this.name);
    this.name = nameVal.getUserName(this.name);
    this.email = emailVal.getEmail(this.email);
    this.password = passwordVal.getPassword(this.password);
  }

  /**
   * Processes the sign-up data.
   */
  async processSignUpData() {
    let userExistend = await this.join.isUserExistent(this.email);
    if (userExistend) {
      this.executeFeedback();
    } else {
      this.executeRegistration();
    }
  }

  /**
   * Executes the user feedback.
   */
  executeFeedback() {
    this.setLog(true, 'email');
    this.returnForm();
  }

  /**
   * Sets the log.
   * @param displayed - A boolean value.
   * @param key - The key of the log text.
   */
  setLog(displayed: boolean, key?: string) {
    this.logKey = key ? key : this.logKey;
    this.logged = displayed;
  }

  /**
   * Returns the sign-up form.
   */
  returnForm() {
    setTimeout(() => {
      this.setLog(false);
      this.signedUp = false;
    }, 2000);
  }

  /**
   * Executes the user registration.
   */
  async executeRegistration() {
    let data = this.getSigneeData();
    await this.registerUser(data);
    this.setLog(true, 'signUp');
    this.selectCustomLogin();
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
   * Selects the custom login.
   */
  selectCustomLogin() {
    setTimeout(() => {
      let url = `login/${this.sid}`;
      this.backToLogin(url);
    }, 1000);
  }

  /**
   * Redirects to the login.
   * @param url - The url of the component.
   */
  backToLogin(url: string) {
    this.router.navigateByUrl(url);
    this.join.setIntroDone();
  }

  /**
   * Redirects to the login on click.
   */
  onBack() {
    this.backToLogin('login');
  }

  /**
   * Accepts the privacy policy on check.
   * @param checked - A boolean value.
   */
  onAccept(checked: boolean) {
    this.ppAccepted = checked;
  }

  /**
   * Verifies the disabled state of the sign-up button.
   * @param ngForm - The sign-up form.
   * @returns - A boolean value.
   */
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || !this.ppAccepted || this.signedUp;
  }
}
