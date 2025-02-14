import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { NameFormatterService } from '../../shared/services/name-formatter.service';

// verfiy!!!
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { User } from '../../shared/models/user';
import { Contact } from '../../shared/models/contact';
import { sampleContacts } from '../../shared/ts/sample-contacts';
import { FormController } from '../../shared/models/form-controller';

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
    CheckboxComponent,
    FooterComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})

/**
 * Class representing a sign-up component.
 * @extends Formcontroller
 */
export class SignUpComponent extends FormController {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);
  namer: NameFormatterService = inject(NameFormatterService);

  // verify!!!
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);

  // delete nameVal, emailVal, passwordVal and inputVal ... ?!
  // improve extends (like FormController) ...
  // set private methods ...
  // fix matchword validation --> validation on focus (not on dirty) ... ?!
  // 5 input values for inputs ... ?

  initials: string = '';
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.setForm();
    this.setConfig();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.form = this.getForm();
    this.addControl('name', '', this.validators.name);
    this.addControl('email', '', this.validators.email);
    this.addControl('password', '', this.validators.password);
    this.addControl('matchword', '', []);
  }

  /**
   * Sets a configuration.
   */
  setConfig() {
    this.addInputConfig('Name', 'person');
    this.addInputConfig('Email', 'email');
    this.addInputConfig('Password', 'lock');
    this.addInputConfig('Confirm Password', 'lock');
  }

  /**
   * Registers the user on submit.
   */
  async onSignUp() {
    if (this.form.valid) {
      this.signedUp = true;
      this.updateSigneeData();
      // await this.processSignUpData(); // activate!!!
    }
  }

  /**
   * Updates signee data.
   */
  updateSigneeData() {
    this.updateName();
    this.updateInitials();
  }

  /**
   * Updates the value of a name form control.
   */
  updateName() {
    let name = this.getValue('name');
    let userName = this.namer.getFormattedName(name);
    this.setValue('name', userName);
  }

  /**
   * Updates the initials.
   */
  updateInitials() {
    let name = this.getValue('name');
    this.initials = this.namer.getInitials(name);
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
