import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogComponent } from '../../shared/components/log/log.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { NavigationService } from '../../shared/services/navigation.service';
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
    HeaderComponent,
    LoginArrowComponent,
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
  nav: NavigationService = inject(NavigationService);

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

  /**
   * Processes the sign-up data on submit.
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
    let userDoc = await this.join.getUserDoc(this.email);
    if (userDoc) {
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
    let sid = await this.registerUser(data);
    if (sid) {
      this.setLog(true, 'signUp');
      this.nav.selectCustomLogin(sid);
    }
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
   * @returns - The session id.
   */
  async registerUser(data: any): Promise<string | void> {
    let id = await this.join.addUser(data);
    if (id) {
      return await this.join.getSessionId(id);
    }
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
