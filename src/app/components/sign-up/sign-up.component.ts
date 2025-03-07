import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { NameFormatterService } from '../../shared/services/name-formatter.service';
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';
import { sampleContacts } from '../../shared/ts/sample-contacts';
import { Contact } from '../../shared/models/contact';
import { UserData } from '../../shared/interfaces/user-data';

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
  config: InputConfigurationService = inject(InputConfigurationService);
  validators: InputValidatorService = inject(InputValidatorService);
  nameFormatter: NameFormatterService = inject(NameFormatterService);
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);

  user: User = new User();
  name: AbstractControl | null = null;
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  matchword: AbstractControl | null = null;
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  texts = {
    rejected: 'Email already associated with account',
    registered: 'You signed up successfully',
  };

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.setForm();
    this.setControls();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.registerControl('name', '', this.validators.name);
    this.registerControl('email', '', this.validators.email);
    this.registerControl('password', '', this.validators.password);
    this.registerControl('matchword', '');
  }

  /**
   * Sets form controls.
   */
  setControls() {
    this.name = this.get('name');
    this.email = this.get('email');
    this.password = this.get('password');
    this.matchword = this.get('matchword');
  }

  /**
   * Registers a user on submit.
   */
  async onSignUp() {
    if (this.form.valid) {
      this.signedUp = true;
      let userDoc = await this.getUserDoc();
      userDoc ? this.reject() : this.signUp();
    }
  }

  /**
   * Gets a user doc.
   * @returns The user doc.
   */
  async getUserDoc() {
    return await this.join.getUserDoc(this.email?.value);
  }

  /**
   * Rejects a form.
   */
  reject() {
    let text = this.texts.rejected;
    this.log.setLog(true, text);
    this.rejectBelatedly();
  }

  /**
   * Rejects a form belatedly.
   */
  rejectBelatedly() {
    setTimeout(() => {
      this.log.setLog(false);
      this.signedUp = false;
    }, 2000);
  }

  /**
   * Registers a user.
   */
  async signUp() {
    this.updateUser();
    this.updateUserContacts();
    let data = this.getUserData();
    await this.addUser(data);
  }

  /**
   * Udpates a user.
   */
  updateUser() {
    this.user.name = this.getName();
    this.user.initials = this.getInitials(this.user.name);
    this.user.email = this.getValue('email');
    this.user.password = this.getValue('password');
  }

  /**
   * Gets a user name.
   * @returns The user name.
   */
  getName() {
    return this.nameFormatter.getFormattedName(this.name?.value);
  }

  /**
   * Gets user initials.
   * @param name - The user name.
   * @returns The user initials.
   */
  getInitials(name: string) {
    return this.nameFormatter.getInitials(name);
  }

  /**
   * Updates user contacts.
   */
  updateUserContacts() {
    let contact = this.getContact(this.user);
    this.user.contacts.push(contact);
    this.user.contacts.push(...sampleContacts);
  }

  /**
   * Gets a user as a contact.
   * @param user - The user.
   * @returns The user as a contact.
   */
  getContact(user: User) {
    let contact = new Contact();
    contact.initials = user.initials;
    contact.bgc = 'lightblue';
    contact.name = `${user.name} (You)`;
    contact.email = user.email;
    return contact;
  }

  /**
   * Gets user data.
   * @returns The user data.
   */
  getUserData() {
    let data = this.user.getObject();
    return { data };
  }

  /**
   * Adds a user.
   * @param data - The user data.
   */
  async addUser(data: UserData): Promise<string | void> {
    let id = await this.join.addUser(data);
    if (id) {
      let text = this.texts.registered;
      await this.nav.openLoginSession(id, text);
    }
  }

  /**
   * Accepts a privacy policy on check.
   * @param checked - A boolean value.
   */
  onAccept(checked: boolean) {
    this.ppAccepted = checked;
  }

  /**
   * Verifies the disabled state of a sign-up button.
   * @returns A boolean value.
   */
  isDisabled() {
    return this.form.invalid || !this.ppAccepted || this.signedUp;
  }
}
