import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { InputConfigurationService } from '../../shared/services/input-configuration.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { LogService } from '../../shared/services/log.service';
import { CookieService } from '../../shared/services/cookie.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LogoComponent,
    HeaderComponent,
    LoginArrowComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    FooterComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})

/**
 * Class representing a new password component.
 */
export class NewPasswordComponent extends FormController {
  join: JoinService = inject(JoinService);
  config: InputConfigurationService = inject(InputConfigurationService);
  validators: InputValidatorService = inject(InputValidatorService);
  log: LogService = inject(LogService);
  cookies: CookieService = inject(CookieService);
  nav: NavigationService = inject(NavigationService);

  id: string = '';
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  matchword: AbstractControl | null = null;
  submitted: boolean = false;
  rejected: boolean = false;
  error: string = 'Email unknown.';
  backlogText: string = 'Password updated successfully';

  /**
   * Initializes the new password component.
   */
  ngOnInit() {
    this.join.subscribeUserCollection();
    this.setForm();
    this.setControls();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.registerControl('email', '', this.validators.email);
  }

  /**
   * Sets form controls.
   */
  setControls() {
    this.email = this.get('email');
  }

  /**
   * Continues a form on submit.
   */
  onContinue() {
    if (this.form.valid) {
      this.submitted = true;
      let user = this.join.getRegisteredUser(this.email?.value);
      user ? this.continue(user) : this.reject();
    }
  }

  /**
   * Continues a form.
   * @param user - The user.
   */
  continue(user: User) {
    this.id = user.id;
    this.updateForm();
    this.updateControls();
    this.submitted = false;
  }

  /**
   * Updates a form.
   */
  updateForm() {
    this.removeControl('email');
    this.addControl('password', '', this.validators.password);
    this.addControl('matchword', '');
  }

  /**
   * Updates form controls.
   */
  updateControls() {
    this.email = this.get('email');
    this.password = this.get('password');
    this.matchword = this.get('matchword');
  }

  /**
   * Rejects a form.
   */
  reject() {
    this.rejected = true;
    this.submitted = false;
  }

  /**
   * Verifies the disabled state of a submit button.
   * @returns A boolean value.
   */
  isDisabled() {
    return this.form.invalid || this.submitted;
  }

  /**
   * Updates a user password on submit.
   */
  onUpdate() {
    if (this.form.valid) {
      this.submitted = true;
      this.updatePassword();
      this.openLoginSession();
    }
  }

  /**
   * Updates a user password.
   */
  updatePassword() {
    this.join.updateUser(this.id, 'data.password', this.password?.value);
  }

  /**
   * Opens a login session.
   */
  openLoginSession() {
    this.cookies.deleteCookie('token');
    this.nav.openLoginSession(this.id, this.backlogText);
  }

  ngOnDestroy() {
    this.join.unsubscribeUserCollection();
  }
}
