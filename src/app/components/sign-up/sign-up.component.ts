import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { concatMap, Observable, tap } from 'rxjs';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { BacklogComponent } from '../../shared/components/backlog/backlog.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackArrowButtonComponent } from '../../shared/components/back-arrow-button/back-arrow-button.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { SummaryService } from '../../shared/services/summary.service';
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { NameFormatterService } from '../../shared/services/name-formatter.service';
import { CookieService } from '../../shared/services/cookie.service';
import { DialogService } from '../../shared/services/dialog.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';
import { Contact } from '../../shared/models/contact';
import { Task } from '../../shared/models/task';
import { getArrayCopy, getCustomArray } from '../../shared/ts/global';
import { sampleContactsData } from '../../shared/ts/sample-contacts-data';
import { sampleTasksData } from '../../shared/ts/sample-tasks-data';
import { Model } from '../../shared/interfaces/model';
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
    BacklogComponent,
    HeaderComponent,
    BackArrowButtonComponent,
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
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
  config: InputConfigurationService = inject(InputConfigurationService);
  validators: InputValidatorService = inject(InputValidatorService);
  nameFormatter: NameFormatterService = inject(NameFormatterService);
  cookies: CookieService = inject(CookieService);
  dialogs: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  user: User = new User();
  name: AbstractControl | null = null;
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  matchword: AbstractControl | null = null;
  ppAccepted: boolean = false;
  signedUp: boolean = false;
  backlogText: string = '';

  texts = {
    rejected: 'Email already assigned',
    registered: 'You signed up successfully',
  };

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.setUserSamples();
    this.setForm();
    this.setControls();
    this.join.subscribeUserCollection();
  }

  /**
   * Sets user samples.
   */
  private setUserSamples() {
    this.user.contacts = this.getUserProperty(sampleContactsData, Contact);
    this.user.tasks = this.getUserProperty(sampleTasksData, Task);
    this.user.summary = this.summary.get(this.user.tasks);
  }

  /**
   * Gets a user property as custom array.
   * @param data - The sample data.
   * @param Model - The custom class.
   * @returns The user property as custom array.
   */
  private getUserProperty<T>(data: T[], Model: Model<T>) {
    let items = getArrayCopy(data);
    return getCustomArray(items, Model);
  }

  /**
   * Sets a form.
   */
  private setForm() {
    this.registerControl('name', '', this.validators.name);
    this.registerControl('email', '', this.validators.email);
    this.registerControl('password', '', this.validators.password);
    this.registerControl('matchword', '', this.validators.getMatchword(''));
  }

  /**
   * Sets form controls.
   */
  private setControls() {
    this.name = this.get('name');
    this.email = this.get('email');
    this.password = this.get('password');
    this.matchword = this.get('matchword');
  }

  /**
   * Gets the css class of a backlog.
   * @returns The css class of a backlog.
   */
  getBacklogClass() {
    return this.dialogs.getBacklogClass();
  }

  /**
   * Registers a user on submit.
   */
  onSignUp() {
    if (this.form.valid) {
      this.signedUp = true;
      let user = this.join.getRegisteredUser(this.email?.value);
      user ? this.reject() : this.signUp();
    }
  }

  /**
   * Rejects a form.
   */
  private reject() {
    this.backlogText = this.texts.rejected;
    this.dialogs.open('backlog');
    this.rejectBelatedly();
  }

  /**
   * Rejects a form belatedly.
   */
  private rejectBelatedly() {
    setTimeout(() => {
      this.dialogs.close('backlog');
      this.signedUp = false;
    }, 1000);
  }

  /**
   * Registers a user.
   */
  private signUp() {
    this.formatUser();
    const data = this.getUserData();
    const response = this.registerUser(data);
    this.subscribeUserRegistration(response);
  }

  /**
   * Formats a user.
   */
  private formatUser() {
    this.user.name = this.getName();
    this.user.initials = this.getInitials(this.user.name);
    this.user.email = this.getValue('email');
    this.user.password = this.getValue('password');
  }

  /**
   * Gets a user name.
   * @returns The user name.
   */
  private getName() {
    return this.nameFormatter.getFormattedName(this.name?.value);
  }

  /**
   * Gets user initials.
   * @param name - The user name.
   * @returns The user initials.
   */
  private getInitials(name: string) {
    return this.nameFormatter.getInitials(name);
  }

  /**
   * Gets user data.
   * @returns The user data.
   */
  private getUserData() {
    return this.user.getObject();
  }

  /**
   * Registers a user.
   * @param data - The user data.
   * @returns An observable as void.
   */
  private registerUser(data: UserData) {
    const userRef = this.join.addUser(data);
    return userRef.pipe(concatMap((userRef) => this.updateUserId(userRef)));
  }

  /**
   * Updates a user id.
   * @param userRef - The user document reference.
   * @returns An observable as void.
   */
  private updateUserId(userRef: DocumentReference<DocumentData, DocumentData>) {
    const id = userRef.id;
    const response = this.join.updateUser(id, 'data.id', id);
    return response.pipe(tap(() => this.openLoginSession(id)));
  }

  /**
   * Subscribes a user registration.
   * @param response - The firestore response.
   */
  private subscribeUserRegistration(response: Observable<void>) {
    response.subscribe({
      error: (error) => this.logRegistrationError(error),
    });
  }

  /**
   * Logs a registration error.
   * @param error - The error.
   */
  private logRegistrationError(error: any) {
    console.log('Error - Could not complete user registration: ', error);
  }

  /**
   * Opens a login session.
   * @param id - The user id.
   */
  private openLoginSession(id: string) {
    this.backlogText = this.texts.registered;
    this.cookies.deleteCookie('token');
    this.nav.openLoginSession(id);
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

  /**
   * Destroys a sign-up component.
   */
  ngOnDestroy() {
    this.join.unsubscribeUserCollection();
  }
}
