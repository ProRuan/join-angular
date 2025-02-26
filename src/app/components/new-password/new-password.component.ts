import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { UserDoc } from '../../shared/models/user-doc';

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
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);

  title: string = 'Email';
  id: string = '';
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  matchword: AbstractControl | null = null;
  submitted: boolean = false;
  rejected: boolean = false;
  error: string = 'Email unknown.';

  /**
   * Initializes the new password component.
   */
  ngOnInit() {
    this.setForm();
    this.setControls();
    this.setConfig();
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
   * Sets a configuration.
   */
  setConfig() {
    this.addInputConfig('Email', 'email', true);
    this.addInputConfig('Password', 'lock');
    this.addInputConfig('Confirm Password', 'lock');
  }

  /**
   * Continues a form on submit.
   */
  async onContinue() {
    if (this.form.valid) {
      this.submitted = true;
      let userDoc = await this.getUserDoc();
      userDoc ? this.continue(userDoc) : this.reject();
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
   * Continues a form.
   * @param userDoc - The user doc.
   */
  continue(userDoc: UserDoc) {
    this.title = 'Password';
    this.id = userDoc.id;
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
  async onUpdate() {
    if (this.form.valid) {
      this.submitted = true;
      await this.updatePassword();
      await this.openLoginSession();
    }
  }

  /**
   * Updates a user password.
   */
  async updatePassword() {
    await this.join.updateUser(this.id, 'data.password', this.password?.value);
  }

  /**
   * Opens a login session.
   */
  async openLoginSession() {
    let text = 'Password updated successfully';
    await this.nav.openLoginSession(this.id, text);
  }
}
