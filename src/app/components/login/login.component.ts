import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
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
import { CookieService } from '../../shared/services/cookie.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FormController } from '../../shared/models/form-controller';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { User } from '../../shared/models/user';

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
  cookies: CookieService = inject(CookieService);
  nav: NavigationService = inject(NavigationService);

  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  remembered: boolean = false;
  loggedIn: boolean = false;
  loadSubscription?: Subscription;
  memorySubscription?: Subscription;
  routeSubscription?: Subscription;
  emailSubscription?: Subscription;
  error = 'Check your email and password. Please try again.';

  /**
   * Initializes a login component.
   */
  ngOnInit() {
    this.setForm();
    this.setControls();
    this.setRememberedUser();
    this.setRegisteredEmail();
    this.join.subscribeUserCollection();
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
   * Sets a remembered user.
   */
  private setRememberedUser() {
    this.loadSubscription = this.join.loaded$.subscribe({
      next: (loaded) => this.rememberUserByCookie(loaded),
    });
  }

  /**
   * Remembers a user by cookie.
   * @param loaded - A boolean value.
   */
  private rememberUserByCookie(loaded: boolean) {
    if (loaded) {
      const token = this.cookies.getCookie('token');
      if (token) this.updateLoginForm(token);
    }
  }

  /**
   * Updates a login form.
   * @param token - The user token.
   */
  private updateLoginForm(token: string) {
    this.join.unsubscribe(this.memorySubscription);
    this.memorySubscription = this.join.getUserById(token).subscribe({
      next: (userSnap) => this.setLoginForm(userSnap),
    });
  }

  /**
   * Sets a login form.
   * @param userSnap - The user documment snapshot.
   */
  private setLoginForm(userSnap: DocumentSnapshot<DocumentData, DocumentData>) {
    let data = this.join.getUserDataBySnap(userSnap);
    if (data) {
      this.setValue('email', data.email);
      this.setValue('password', data.password);
      this.remembered = true;
    }
  }

  /**
   * Sets the login email of a registered user.
   */
  private setRegisteredEmail() {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) this.updateEmailInput(id);
    });
  }

  /**
   * Updates an email input by user id.
   * @param id - The user id.
   */
  private updateEmailInput(id: string) {
    this.join.unsubscribe(this.emailSubscription);
    this.emailSubscription = this.join.getUserById(id).subscribe({
      next: (userSnap) => this.setEmail(userSnap),
    });
  }

  /**
   * Sets an email value.
   * @param userSnap - The user document snapshot.
   */
  private setEmail(userSnap: DocumentSnapshot<DocumentData, DocumentData>) {
    let data = this.join.getUserDataBySnap(userSnap);
    if (data) this.setValue('email', data.email);
  }

  /**
   * Logs in a user on submit.
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
    this.join.user.set(user);
    this.manageCookies(user.id);
    this.router.navigate(['main', user.id, 'summary']);
  }

  /**
   * Manages cookies.
   * @param id - The user id.
   */
  manageCookies(id: string) {
    if (this.remembered) {
      this.cookies.setCookie('token', id, 30);
    } else {
      this.cookies.deleteCookie('token');
    }
  }

  /**
   * Rejects a form.
   */
  private reject() {
    this.validators.setRejected(true);
    this.cookies.deleteCookie('token');
    this.setValue('password', '');
    this.loggedIn = false;
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
    this.join.unsubscribe(this.loadSubscription);
    this.join.unsubscribe(this.memorySubscription);
    this.join.unsubscribe(this.routeSubscription);
    this.join.unsubscribe(this.emailSubscription);
    this.join.unsubscribeUserCollection();
  }
}
