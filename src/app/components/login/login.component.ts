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
import {
  getLocalItem,
  isDefaultString,
  removeLocalItem,
  setLocalItem,
} from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { UserDoc } from '../../shared/models/user-doc';
import { FormController } from '../../shared/models/form-controller';

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
  async ngOnInit() {
    this.setForm();
    this.setControls();
    await this.setSigneeEmail();
    await this.setRememberedUser();
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
  setControls() {
    this.email = this.get('email');
    this.password = this.get('password');
  }

  /**
   * Sets the signee email.
   */
  private async setSigneeEmail() {
    let sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      await this.updateEmailControl(sid);
    }
  }

  /**
   * Updates the value of the email form control.
   * @param sid - The session id.
   */
  private async updateEmailControl(sid: string) {
    let user = await this.join.getUserBySid(sid);
    if (user) {
      this.setValue('email', user.email);
    }
  }

  /**
   * Sets the remembered user.
   */
  private async setRememberedUser() {
    let email = this.getValue('email');
    if (isDefaultString(email)) {
      let rememberedAsText = getLocalItem('remembered');
      let userAsText = getLocalItem('user');
      if (rememberedAsText && userAsText) {
        let user = JSON.parse(userAsText);
        await this.verifyLoadedUser(user);
      }
    }
  }

  /**
   * Verifies the loaded user.
   * @param user - The loaded user.
   */
  private async verifyLoadedUser(user: User) {
    let userExistent = await this.join.getUserDoc(user.email, user.password);
    userExistent ? this.updateForm(user) : this.removeRememberedUser();
  }

  /**
   * Updates the form by the loaded user.
   * @param user - The loaded user.
   */
  private updateForm(user: User) {
    this.setValue('email', user.email);
    this.setValue('password', user.password);
    this.remembered = true;
  }

  /**
   * Removes the remembered user from the local storage.
   */
  private removeRememberedUser() {
    removeLocalItem('remembered');
    removeLocalItem('user');
  }

  /**
   * Logs the user in on submit.
   */
  async onLogin() {
    if (this.form.valid) {
      this.loggedIn = true;
      let userDoc = await this.getUserDoc();
      userDoc ? await this.logIn(userDoc) : this.reject();
    }
  }

  /**
   * Gets the user doc.
   * @returns The user doc.
   */
  private async getUserDoc() {
    let email = this.getValue('email');
    let password = this.getValue('password');
    return await this.join.getUserDoc(email, password);
  }

  /**
   * Logs a user in.
   * @param userDoc - The user doc.
   */
  private async logIn(userDoc: UserDoc) {
    this.validators.setRejected(false);
    let sid = await this.join.getSessionId(userDoc.id);
    this.rememberUser();
    this.join.logUserIn(userDoc.data);
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
