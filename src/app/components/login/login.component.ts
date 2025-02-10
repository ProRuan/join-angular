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
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { emailPatterns, passwordPatterns } from '../../shared/ts/pattern';
import { InputValidator } from '../../shared/models/input-validator';

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
    TextInputComponent,
    // EmailInputComponent,
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

  // this
  // ----
  // - input height (error) ...
  // - input border color (error) ...
  // - login form error ...

  [key: string]: any;
  user: User = new User();
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  remembered: boolean = false;
  loggedIn: boolean = true;
  rejected: boolean = false;
  hint = 'Check your email and password. Please try again.';

  loginForm!: FormGroup;

  validator = new InputValidator();

  emailValidators = [
    this.validator.required(),
    // this.validator.forbidden(emailPatterns.forbidden),
    // this.validator.minLength(6),
    // this.validator.email(emailPatterns.email),
    // this.validator.maxLength(127),
  ];

  passwordValidators = [
    this.validator.required(),
    // this.validator.forbidden(passwordPatterns.forbidden),
    // this.validator.minLength(8),
    // this.validator.upperCase(passwordPatterns.upperCase),
    // this.validator.lowerCase(passwordPatterns.lowerCase),
    // this.validator.digit(passwordPatterns.digit),
    // this.validator.specialChar(passwordPatterns.specialChar),
    // this.validator.maxLength(127),
  ];

  config!: {
    email: {
      placeholder: string;
      img: string;
      control: any;
    };
    password: {
      placeholder: string;
      img: string;
      control: any;
    };
  };

  get control() {
    return this.loginForm.controls;
  }

  set control(value: any) {
    this.loginForm.setControl(value.name, value.control);
  }

  /**
   * Initializes the login component.
   */
  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: [this.user.email, this.emailValidators],
      password: [this.user.password, this.passwordValidators], // @Input() pattern!
    });
    console.log('loginForm: ', this.loginForm);
    console.log('get email: ', this.loginForm.value.email);

    this.config = {
      email: {
        placeholder: 'Email',
        img: 'email',
        control: this.control.email,
      },
      password: {
        placeholder: 'Password',
        img: 'lock',
        control: this.control.password,
      },
    };

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
      this.user.email = user.email;
    }
  }

  /**
   * Sets the remembered user data.
   */
  async setRememberedData() {
    if (this.user.email == '') {
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
      this.user.email = user.email;
      this.user.password = user.password;
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
      // console.log('loginForm: ', this.loginForm); // testing!!!
      // this.loginForm.reset(); // testing!!!

      this.loggedIn = true;
      await this.processLoginData();
    }
  }

  /**
   * Processes the login data.
   */
  async processLoginData() {
    let userDoc = await this.join.getUserDoc(
      this.user.email,
      this.user.password
    );
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
