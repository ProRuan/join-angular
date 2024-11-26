import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoginArrowComponent } from '../../shared/components/login-arrow/login-arrow.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { LogService } from '../../shared/services/log.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { passwordVal } from '../../shared/services/input-validation.service';
import { UserDoc } from '../../shared/models/user-doc';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
 * Represents a new password component.
 */
export class NewPasswordComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  log: LogService = inject(LogService);
  nav: NavigationService = inject(NavigationService);

  [key: string]: any;
  title: string = 'Join user';
  id: string = '';
  email: string = '';
  submitted: boolean = true;
  rejected: boolean = false;
  hint: string = 'Email unknown.';
  password: string = '';
  matchword: string = '';
  passwordPat: RegExp = passwordVal.passwordPat;

  /**
   * Provides the entered state of the email.
   * @returns - A boolean value.
   */
  get emailEntered() {
    return this.id.length != 0;
  }

  /**
   * Initializes the new password component.
   */
  ngOnInit() {
    setTimeout(() => (this.submitted = false), 0);
  }

  /**
   * Verifies the user on submit.
   * @param ngForm - The enter email form.
   */
  async onVerifyUser(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.submitted = true;
      let userDoc = await this.join.getUserDoc(this.email);
      this.verifyUser(userDoc);
      this.submitted = false;
    }
  }

  /**
   * Verifies the user.
   * @param userDoc - The user document.
   */
  verifyUser(userDoc?: UserDoc) {
    if (userDoc) {
      this.title = 'Password';
      this.id = userDoc.id;
    } else {
      this.rejected = true;
    }
  }

  /**
   * Verifies the disabled state of the submit button.
   * @param ngForm - The submitted form.
   * @returns - A boolean value.
   */
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || this.submitted;
  }

  /**
   * Updates the user password on submit.
   * @param ngForm - The new password form.
   */
  async onUpdatePassword(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.submitted = true;
      await this.join.updateUser(this.id, 'data.password', this.password);
      await this.nav.openLoginSession(this.id);
    }
  }
}
