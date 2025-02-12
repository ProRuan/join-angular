import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
// import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
// import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import {
  nameVal,
  emailVal,
  passwordVal,
} from '../../shared/services/input-validation.service';
import { User } from '../../shared/models/user';
import { Contact } from '../../shared/models/contact';
import { sampleContacts } from '../../shared/ts/sample-contacts';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { InputValidator } from '../../shared/models/input-validator';
import {
  emailPatterns,
  namePatterns,
  passwordPatterns,
} from '../../shared/ts/pattern';
import { InputConfig } from '../../shared/interfaces/input-config';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    HeaderComponent,
    LoginArrowComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    // TextInputComponent,
    // PasswordInputComponent,
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
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);
  fb: FormBuilder = inject(FormBuilder);

  // PasswordInputComponent: mask, button etc. ...

  // JoinService
  // -----------
  // getUserBySid() ...
  // getUserDoc() ...
  // getSessionId() ...

  // LoginComponent
  // --------------
  // logIn() --> sid ...
  // rememberUser() ...

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

  user: User = new User();
  form!: FormGroup;
  validator = new InputValidator();

  nameValidators = [
    this.validator.required(),
    this.validator.forbidden(namePatterns.forbidden),
    this.validator.minLength(2),
    this.validator.sequence(namePatterns.sequence),
    this.validator.name(namePatterns.name),
    this.validator.maxLength(127),
  ];

  emailValidators = [
    this.validator.required(),
    this.validator.forbidden(emailPatterns.forbidden),
    this.validator.minLength(6),
    this.validator.email(emailPatterns.email),
    this.validator.maxLength(127),
  ];

  passwordValidators = [
    this.validator.required(),
    this.validator.forbidden(passwordPatterns.forbidden),
    this.validator.minLength(8),
    this.validator.upperCase(passwordPatterns.upperCase),
    this.validator.lowerCase(passwordPatterns.lowerCase),
    this.validator.digit(passwordPatterns.digit),
    this.validator.specialChar(passwordPatterns.specialChar),
    this.validator.maxLength(127),
  ]; // set validator for matchword by pattern (pattern = valid password)!!!

  config!: {
    name: InputConfig;
    email: InputConfig;
    password: InputConfig;
    matchword: InputConfig;
  };

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.user.name, this.nameValidators],
      email: [this.user.email, this.emailValidators],
      password: [this.user.password, this.passwordValidators],
      matchword: [this.matchword, this.passwordValidators], // set validator for pattern!!!
    });

    this.config = {
      name: {
        placeholder: 'Name',
        img: 'person',
        valOff: false,
      },
      email: {
        placeholder: 'Email',
        img: 'email',
        valOff: false,
      },
      password: {
        placeholder: 'Password',
        img: 'lock',
        valOff: false,
      },
      matchword: {
        placeholder: 'Confirm password',
        img: 'lock',

        valOff: false,
      },
    };
  }

  /**
   * Gets a form control.
   * @param name - The form control name.
   * @returns The form control.
   */
  getControl(name: string) {
    return this.form.get(name);
  }

  /**
   * Processes the sign-up data on submit.
   */
  async onSignUp() {
    if (this.form.valid) {
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
    this.log.setLog(true, 'email');
    this.returnForm();
  }

  /**
   * Returns the sign-up form.
   */
  returnForm() {
    setTimeout(() => {
      this.log.setLog(false);
      this.signedUp = false;
    }, 2000);
  }

  /**
   * Executes the user registration.
   */
  async executeRegistration() {
    let data = this.getSigneeData();
    await this.registerUser(data);
  }

  /**
   * Provides the signee data.
   * @returns - The signee data.
   */
  getSigneeData() {
    let signee = this.getSignee();
    let contact = this.getContact();
    signee.contacts.push(contact);
    signee.contacts.push(...sampleContacts);
    return { data: signee.getObject() };
  }

  /**
   * Provides the signee.
   * @returns - The signee.
   */
  getSignee() {
    let signee = new User();
    signee.initials = this.initials;
    signee.name = this.name;
    signee.email = this.email;
    signee.password = this.password;
    return signee;
  }

  /**
   * Provides the signee contact.
   * @returns - The signee contact.
   */
  getContact() {
    let contact = new Contact();
    contact.initials = this.initials;
    contact.bgc = 'lightblue';
    contact.name = `${this.name} (You)`;
    contact.email = this.email;
    return contact;
  }

  /**
   * Registers the user.
   * @param data - The signee data.
   */
  async registerUser(data: any): Promise<string | void> {
    let id = await this.join.addUser(data);
    if (id) {
      this.nav.openLoginSession(id);
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
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.form.invalid || !this.ppAccepted || this.signedUp;
  }
}
