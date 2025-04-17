import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { BacklogComponent } from '../../shared/components/backlog/backlog.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackArrowButtonComponent } from '../../shared/components/back-arrow-button/back-arrow-button.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { CookieService } from '../../shared/services/cookie.service';
import { DialogService } from '../../shared/services/dialog.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';
import { DocSnap } from '../../shared/ts/type';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss',
})

/**
 * Class representing a sign-out component.
 */
export class SignOutComponent extends FormController {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  config: InputConfigurationService = inject(InputConfigurationService);
  validators: InputValidatorService = inject(InputValidatorService);
  cookies: CookieService = inject(CookieService);
  dialogs: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  user: User = new User();
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  confirmed: boolean = false;
  understood: boolean = false;
  signedOut: boolean = false;

  /**
   * Initializes a sign-up component.
   */
  ngOnInit() {
    this.setForm();
    this.setControls();
    this.updateUserByRoute();
  }

  /**
   * Sets a form.
   */
  private setForm() {
    this.registerControl('email', '', this.validators.email);
    this.registerControl('password', '', this.validators.password);
  }

  /**
   * Sets form controls.
   */
  private setControls() {
    this.email = this.get('email');
    this.password = this.get('password');
  }

  /**
   * Updates a user by activated route.
   */
  updateUserByRoute() {
    this.route.paramMap.subscribe((params) => this.updateUserById(params));
  }

  /**
   * Updates a user by id.
   * @param params - The ParamMap.
   */
  updateUserById(params: ParamMap) {
    let id = params.get('id');
    if (id) this.setUserById(id);
  }

  /**
   * Sets a user by id.
   * @param id - The user id.
   */
  setUserById(id: string) {
    this.join.getUserById(id).subscribe({
      next: (userSnap) => this.setUser(userSnap),
      error: (error) => console.log('Error - Could not get user: ', error),
    });
  }

  /**
   * Sets a user.
   * @param userSnap - The user document snapshot.
   */
  setUser(userSnap: DocSnap) {
    let data = this.join.getUserDataBySnap(userSnap);
    if (data) {
      this.join.user.set(data);
    }
  }

  /**
   * Deregisters a user on submit.
   */
  onSignOut() {
    if (this.form.valid) {
      this.validators.setRejected(false);
      this.signedOut = true;
      this.isUser() ? this.signOut() : this.reject();
    }
  }

  /**
   * Verifies a user by data match.
   * @returns A boolean value.
   */
  isUser() {
    let emailMatched = this.isUserProperty('email');
    let passwordMatched = this.isUserProperty('password');
    return emailMatched && passwordMatched;
  }

  /**
   * Verifies a user property by data match.
   * @param key - The property key.
   * @returns A boolean value.
   */
  isUserProperty(key: string) {
    return this.getValue(key) === this.join.user[key];
  }

  /**
   * Deregisters a user.
   */
  private signOut() {
    this.join.deleteUser(this.join.user.id).subscribe({
      next: () => this.openLoginSession(),
      error: (error) => console.log('Error - Could not delete user: ', error),
    });
  }

  /**
   * Opens a login session.
   */
  private openLoginSession() {
    this.cookies.deleteCookie('token');
    this.nav.openLoginSession();
  }

  /**
   * Rejects a form.
   */
  private reject() {
    this.validators.setRejected(true);
    this.cookies.deleteCookie('token');
    this.setValue('password', '');
    this.signedOut = false;
  }

  /**
   * Sets the value "confirmed" on check.
   * @param checked - A boolean value.
   */
  onConfirm(checked: boolean) {
    this.confirmed = checked;
  }

  /**
   * Sets the value "understood" on check.
   * @param checked - A boolean value.
   */
  onUnderstand(checked: boolean) {
    this.understood = checked;
  }

  /**
   * Verifies the disabled state of a sign-up button.
   * @returns A boolean value.
   */
  isDisabled() {
    return this.form.invalid || !this.isChecked() || this.signedOut;
  }

  /**
   * Verifies checkbox states.
   * @returns A boolean value.
   */
  isChecked() {
    return this.confirmed && this.understood;
  }
}
