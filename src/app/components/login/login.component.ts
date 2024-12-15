import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import {
  emailVal,
  passwordVal,
} from '../../shared/services/input-validation.service';
// global.ts! (5x)
import { saveUser } from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { UserDoc } from '../../shared/models/user-doc';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LogoComponent,
    HeaderComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

/**
 * Represents a login component.
 */
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  [key: string]: any;
  email: string = '';
  password: string = '';
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  remembered: boolean = false;
  loggedIn: boolean = true;
  rejected: boolean = false;
  hint = 'Check your email and password. Please try again.';

  /**
   * Initializes the login component.
   */
  async ngOnInit() {
    await this.setSigneeEmail();
    await this.setRememberedData();
    setTimeout(() => (this.loggedIn = false), 0);
  }

  /**
   * Sets the signee email.
   */
  async setSigneeEmail() {
    let sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      await this.setEmail(sid);
    }
  }

  /**
   * Sets the email.
   * @param sid - The session id.
   */
  async setEmail(sid: string) {
    let user = await this.join.getUserBySid(sid);
    if (user) {
      this.email = user.email;
    }
  }

  /**
   * Sets the remembered user data.
   */
  async setRememberedData() {
    if (this.email == '') {
      // global.ts!
      let trueAsText = localStorage.getItem('remembered');
      let userAsText = localStorage.getItem('user');
      if (trueAsText && userAsText) {
        let user = JSON.parse(userAsText);
        await this.verifyLoadedUser(user);
      }
    }
  }

  /**
   * Verifies the loaded user.
   * @param user - The loaded user.
   */
  async verifyLoadedUser(user: User) {
    let userExistent = await this.join.getUserDoc(user.email, user.password);
    if (userExistent) {
      this.email = user.email;
      this.password = user.password;
      this.remembered = true;
    } else {
      // global.ts!
      localStorage.removeItem('remembered');
      localStorage.removeItem('user');
    }
  }

  /**
   * Processes the login data on submit.
   * @param ngForm - The login form.
   */
  async onLogIn(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.loggedIn = true;
      await this.processLoginData();
    }
  }

  /**
   * Processes the login data.
   */
  async processLoginData() {
    let userDoc = await this.join.getUserDoc(this.email, this.password);
    if (userDoc) {
      await this.executeLogin(userDoc);
    } else {
      this.executeFeedback();
    }
  }

  /**
   * Executes the user login.
   * @param id - The user id.
   */
  async executeLogin(userDoc: UserDoc) {
    this.rejected = !this.rejected ? this.rejected : false;
    let sid = await this.join.getSessionId(userDoc.id);
    this.rememberUser(userDoc.data);
    // global.ts!
    saveUser(userDoc.data);
    this.join.subscribe(userDoc.id);
    this.join.user = new User(userDoc.data);
    this.router.navigate(['main', sid, 'summary']);
  }

  /**
   * Remembers the user.
   * @param data - The user data.
   */
  rememberUser(data: User) {
    if (this.remembered) {
      localStorage.setItem('remembered', JSON.stringify(true));
      // global.ts!
      saveUser(data);
    } else {
      localStorage.removeItem('remembered');
      localStorage.removeItem('user');
    }
  }

  /**
   * Executes the user feedback.
   */
  executeFeedback() {
    this.rejected = true;
    this.loggedIn = false;
  }

  /**
   * Remembers the user on check.
   * @param checked - A boolean value.
   */
  onRemember(checked: boolean) {
    this.remembered = checked;
  }

  /**
   * Verifies the disabled state of the login button.
   * @param ngForm - The login form.
   * @returns - A boolean value.
   */
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || this.loggedIn;
  }
}
