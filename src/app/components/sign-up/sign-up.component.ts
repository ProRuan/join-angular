import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
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
import { InputValidatorService } from '../../shared/services/input-validator.service';

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
 * Class representing a sign-up component.
 */
export class SignUpComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);
  fb: FormBuilder = inject(FormBuilder);
  validators: InputValidatorService = inject(InputValidatorService);

  // matchword validator ...
  //   --> improve login with updateValueAndValidity() ... !
  // review val services ... (0/3)
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
  // onUserLogin() + onGuestLogin() ...

  [key: string]: any;
  initials: string = '';
  matchword: string = '';
  namePat: RegExp = nameVal.namePat;
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  user: User = new User();
  form!: FormGroup;
  validator = new InputValidator();

  config: InputConfig[] = [];

  // double code
  get(name: string) {
    return this.form.get(name);
  }

  // double code
  getValue(name: string) {
    return this.form.get(name)?.value;
  }

  // double code
  setValue(name: string, value: string) {
    this.form.get(name)?.setValue(value);
  }

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.setForm();
    this.setConfig();
  }

  // double code
  setForm() {
    this.form = this.getForm();
    this.addControl('name', '', this.validators.name);
    this.addControl('email', '', this.validators.email);
    this.addControl('password', '', this.validators.password);
    this.addControl('matchword', '', []);
  }

  // double code
  getForm() {
    return this.fb.group({});
  }

  // double code
  addControl(name: string, value: string, validators: ValidatorFn[]) {
    let control = new FormControl(value, validators);
    this.form.addControl(name, control);
  }

  // double code
  setConfig() {
    this.addInputConfig('Name', 'person');
    this.addInputConfig('Email', 'email');
    this.addInputConfig('Password', 'lock');
    this.addInputConfig('Confirm Password', 'lock');
  }

  // double code
  addInputConfig(placeholder: string, img: string, valOff: boolean = false) {
    const inputConfig = { placeholder, img, valOff };
    this.config.push(inputConfig);
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

  // improve!!!
  updateSignUpData() {
    this.initials = nameVal.getInitials(this.getValue('name'));
    this.setValue('name', nameVal.getUserName(this.getValue('name')));
    this.setValue('email', emailVal.getEmail(this.getValue('email')));
    this.setValue(
      'password',
      passwordVal.getPassword(this.getValue('password'))
    );
  }

  /**
   * Processes the sign-up data.
   */
  async processSignUpData() {
    let userDoc = await this.join.getUserDoc(this.getValue('email'));
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
    signee.name = this.getValue('name');
    signee.email = this.getValue('email');
    signee.password = this.getValue('password');
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
    contact.name = `${this.getValue('name')} (You)`;
    contact.email = this.getValue('email');
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
