import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';
import {
  getLocalItem,
  isDefaultString,
  removeLocalItem,
  setLocalItem,
} from '../../shared/ts/global';

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
    PasswordInputComponent,
    CheckboxComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

/**
 * Class representing a login component.
 * @extends FormController
 */
export class LoginComponent extends FormController {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  config: InputConfigurationService = inject(InputConfigurationService);
  validators: InputValidatorService = inject(InputValidatorService);

  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  remembered: boolean = false;
  loggedIn: boolean = false;
  error = 'Check your email and password. Please try again.';

  /**
   * Initializes a login component.
   */
  ngOnInit() {
    this.setForm();
    this.setControls();
    this.setSigneeEmail();
    this.setRememberedUser();
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
   * Sets a signee email.
   */
  private setSigneeEmail() {
    let sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      this.updateEmailControl(sid);
    }
  }

  /**
   * Updates the value of an email form control.
   * @param sid - The session id.
   */
  private updateEmailControl(sid: string) {
    let user = this.join.getUserBySid(sid);
    if (user) {
      this.setValue('email', user.email);
    }
  }

  /**
   * Sets a remembered user.
   */
  private setRememberedUser() {
    if (isDefaultString(this.email?.value)) {
      this.loadRememberedUser();
    }
  }

  /**
   * Loads a remembered user.
   */
  private loadRememberedUser() {
    let remembered = getLocalItem('remembered');
    let user = getLocalItem('user');
    if (remembered && user) {
      this.verifyRememberedUser(user);
    }
  }

  /**
   * Verifies a remembered user.
   * @param user - The remembered user.
   */
  private verifyRememberedUser(user: User) {
    let registeredUser = this.join.getRegisteredUser(user.email, user.password);
    registeredUser ? this.updateForm(user) : this.removeRememberedUser();
  }

  /**
   * Updates the form by a loaded user.
   * @param user - The loaded user.
   */
  private updateForm(user: User) {
    this.setValue('email', user.email);
    this.setValue('password', user.password);
    this.remembered = true;
  }

  /**
   * Removes a remembered user from the local storage.
   */
  private removeRememberedUser() {
    removeLocalItem('remembered');
    removeLocalItem('user');
  }

  /**
   * Logs a user in on submit.
   */
  onLogin() {
    if (this.form.valid) {
      this.loggedIn = true;
      let user = this.getRegisteredUser();
      user ? this.logIn(user) : this.reject();
    }
  }

  /**
   * Gets a registered user.
   * @returns The registered user.
   */
  private getRegisteredUser() {
    let email = this.getValue('email');
    let password = this.getValue('password');
    return this.join.getRegisteredUser(email, password);
  }

  /**
   * Logs a user in.
   * @param user - The user.
   */
  private logIn(user: User) {
    this.validators.setRejected(false);
    let sid = this.join.getSid();
    this.join.updateUser(user.id, 'sid', sid);
    this.join.updateUser(user.id, 'data.sid', sid);
    this.rememberUser();
    this.join.logUserIn(user);
    this.router.navigate(['main', sid, 'summary']);
  }

  /**
   * Remembers a user.
   */
  private rememberUser() {
    if (this.remembered) {
      setLocalItem('remembered', true);
    } else {
      this.removeRememberedUser();
    }
  }

  /**
   * Rejects a form.
   */
  private reject() {
    this.loggedIn = false;
    this.setValue('password', '');
    this.validators.setRejected(true);
  }

  /**
   * Remembers a user on check.
   * @param checked - A boolean value.
   */
  onRememberMe(checked: boolean) {
    this.remembered = checked;
  }

  /**
   * Verifies the disabled state of a login button.
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.form.invalid || this.loggedIn;
  }

  /**
   * Destroys a login component.
   */
  ngOnDestroy() {
    this.validators.setRejected(false);
  }
}
