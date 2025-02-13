import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
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
import { InputValidatorService } from '../../shared/services/input-validator.service';
import { InputConfig } from '../../shared/interfaces/input-config';
import {
  getLocalItem,
  isDefaultString,
  removeLocalItem,
  setLocalItem,
} from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { UserDoc } from '../../shared/models/user-doc';

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
 */
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);

  form!: FormGroup;
  config: InputConfig[] = [];
  remembered: boolean = false;
  loggedIn: boolean = false;
  error = 'Check your email and password. Please try again.';

  /**
   * Gets a form control.
   * @param name - The form control name.
   * @returns The form control.
   */
  get(name: string) {
    return this.form.get(name);
  }

  /**
   * Gets a form control value.
   * @param name - The form control name.
   * @returns The form control value.
   */
  getValue(name: string) {
    return this.form.get(name)?.value;
  }

  /**
   * Sets the value of a form control.
   * @param name - The form control name.
   * @param value - The value to set.
   */
  setValue(name: string, value: string) {
    this.form.get(name)?.setValue(value);
  }

  /**
   * Initializes a login component.
   */
  async ngOnInit() {
    this.setForm();
    this.setConfig();
    await this.setSigneeEmail();
    await this.setRememberedUser();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.form = this.getForm();
    this.addControl('email', '', this.validators.email);
    this.addControl('password', '', this.validators.password);
  }

  /**
   * Gets a form.
   * @returns The form.
   */
  getForm() {
    return this.fb.group({});
  }

  /**
   * Adds a form control.
   * @param name - The form control name.
   * @param value - The form control value.
   * @param validators - The form control validators.
   */
  addControl(name: string, value: string, validators: ValidatorFn[]) {
    let control = new FormControl(value, validators);
    this.form.addControl(name, control);
  }

  /**
   * Sets a configuration.
   */
  setConfig() {
    this.addInputConfig('Email', 'email', true);
    this.addInputConfig('Password', 'lock', true);
  }

  /**
   * Adds an input configuration.
   * @param placeholder - The input placeholder.
   * @param img - The input image.
   * @param valOff - A boolean value.
   */
  addInputConfig(placeholder: string, img: string, valOff: boolean) {
    const inputConfig = { placeholder, img, valOff };
    this.config.push(inputConfig);
  }

  /**
   * Sets the signee email.
   */
  async setSigneeEmail() {
    let sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      await this.updateEmailControl(sid);
    }
  }

  /**
   * Updates the value of the email form control.
   * @param sid - The session id.
   */
  async updateEmailControl(sid: string) {
    let user = await this.join.getUserBySid(sid);
    if (user) {
      this.setValue('email', user.email);
    }
  }

  /**
   * Sets the remembered user.
   */
  async setRememberedUser() {
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
  async verifyLoadedUser(user: User) {
    let userExistent = await this.join.getUserDoc(user.email, user.password);
    userExistent ? this.updateForm(user) : this.removeRememberedUser();
  }

  /**
   * Updates the form by the loaded user.
   * @param user - The loaded user.
   */
  updateForm(user: User) {
    this.setValue('email', user.email);
    this.setValue('password', user.password);
    this.remembered = true;
  }

  /**
   * Removes the remembered user from the local storage.
   */
  removeRememberedUser() {
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
  async getUserDoc() {
    let email = this.getValue('email');
    let password = this.getValue('password');
    return await this.join.getUserDoc(email, password);
  }

  /**
   * Logs a user in.
   * @param userDoc - The user doc.
   */
  async logIn(userDoc: UserDoc) {
    this.validators.setRejected(false);
    let sid = await this.join.getSessionId(userDoc.id);
    this.rememberUser();
    this.join.logUserIn(userDoc.data);
    this.router.navigate(['main', sid, 'summary']);
  }

  /**
   * Remembers a user.
   */
  rememberUser() {
    if (this.remembered) {
      setLocalItem('remembered', true);
    } else {
      this.removeRememberedUser();
    }
  }

  /**
   * Rejects a form.
   */
  reject() {
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
}
