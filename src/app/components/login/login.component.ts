import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
// import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
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
import { EmailInputComponent } from '../../shared/components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    HeaderComponent,
    TitleComponent,
    EmailInputComponent,
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
  fb: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  // check
  // -----
  // components
  // ----------
  // LogoComponent ...
  // HeaderComponent ...
  // TitleComponent ...
  // NameInputComponent --> TextInputComponent ... ?
  // EmailInputComponent --> TextInputComponent ... ?
  // PasswordInputComponent --> masked password ... !
  // CheckboxComponent ...
  // ButtonComponent ...

  // this
  // ----
  // - input height (error) ...
  // - input border color (error) ...
  // - login form error ...

  [key: string]: any;
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  remembered: boolean = false;
  loggedIn: boolean = true;
  rejected: boolean = false;
  hint = 'Check your email and password. Please try again.';

  loginForm!: FormGroup;

  get email() {
    return this.loginForm.value.email;
  }

  get password() {
    return this.loginForm.value.password;
  }

  set email(value: string) {
    this.loginForm.value.email = value;
  }

  set password(value: string) {
    this.loginForm.value.password = value;
  }

  /**
   * Initializes the login component.
   */
  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required], // @Input() pattern!
    });
    console.log('loginForm: ', this.loginForm);
    console.log('get email: ', this.loginForm.value.email);

    await this.setSigneeEmail();
    await this.setRememberedData();
    setTimeout(() => (this.loggedIn = false), 0);
  }

  getControl(key: string) {
    return this.loginForm.get(key);
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
   */
  async onLogIn() {
    if (this.loginForm.valid) {
      console.log('loginForm: ', this.loginForm);

      // this.loggedIn = true;
      // await this.processLoginData();
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
    this.join.setUser(userDoc.data);
    this.join.subscribeUser();
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
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.loginForm.invalid || this.loggedIn;
  }
}
