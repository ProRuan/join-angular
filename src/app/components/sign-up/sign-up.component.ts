import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {
  collection,
  DocumentChange,
  DocumentData,
  Firestore,
  FirestoreError,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { SummaryService } from '../../shared/services/summary.service';
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { NameFormatterService } from '../../shared/services/name-formatter.service';
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';
import { Contact } from '../../shared/models/contact';
import { Task } from '../../shared/models/task';
import { getArrayCopy, getCustomArray } from '../../shared/ts/global';
import { sampleContactsData } from '../../shared/ts/sample-contacts-data';
import { sampleTasksData } from '../../shared/ts/sample-tasks-data';
import { Model } from '../../shared/interfaces/model';

type Snapshot = QuerySnapshot<DocumentData, DocumentData>;
type DocChange = DocumentChange<DocumentData, DocumentData>;

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
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);
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

  unsubscribe: Unsubscribe = () => {};

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.join.subscribeUserCollection();
    this.setUserSamples();
    this.setForm();
    this.setControls();
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
    this.registerControl('matchword', '');
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
    let text = this.texts.rejected;
    this.log.setLog(true, text);
    this.rejectBelatedly();
  }

  /**
   * Rejects a form belatedly.
   */
  private rejectBelatedly() {
    setTimeout(() => {
      this.log.setLog(false);
      this.signedUp = false;
    }, 900);
  }

  /**
   * Registers a user.
   */
  private signUp() {
    this.updateUser();
    this.subscribeUserRegistration();
    let data = this.getUserData();
    this.join.addUser(data);
  }

  /**
   * Updates a user.
   */
  private updateUser() {
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
   * Subscribes a user collection for the user registration.
   */
  private subscribeUserRegistration() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'users'),
      (snapshot) => this.addUser(snapshot),
      (error) => this.logError(error)
    );
  }

  /**
   * Adds a user to the user collection.
   * @param snapshot - The snapshot.
   */
  private addUser(snapshot: Snapshot) {
    snapshot.docChanges().forEach((change) => this.completeSignUp(change));
  }

  /**
   * Completes a sign-up.
   * @param change - The document change.
   */
  private completeSignUp(change: DocChange) {
    if (this.isUserAdded(change)) {
      const id = change.doc.id;
      this.join.addUserId(id);
      this.openLoginSession(id);
    }
  }

  /**
   * Verifies a change on user added.
   * @param change - The document change.
   * @returns A boolean value.
   */
  private isUserAdded(change: DocChange) {
    return change.type === 'added';
  }

  /**
   * Opens a login session.
   * @param id - The user id.
   */
  private openLoginSession(id: string) {
    let text = this.texts.registered;
    this.nav.openLoginSession(id, text);
  }

  /**
   * Logs a firestore error.
   * @param error - The FirestoreError.
   */
  private logError(error: FirestoreError) {
    const text = 'Error - Could not add user';
    this.join.logError(text, error);
  }

  /**
   * Gets user data.
   * @returns The user data.
   */
  private getUserData() {
    return this.user.getObject();
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
    this.unsubscribe();
    this.join.unsubscribeUserCollection();
  }
}
