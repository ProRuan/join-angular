import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { NameVal } from '../../shared/models/name-val';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LogoComponent,
    InputComponent,
    FooterComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  name: string = '';
  email: string = '';
  password: string = '';
  passwordPat: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

  // verify!!!
  emailHint = 'Please use a valid email.';
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  // think about namePat + review emailPat + review passwordPat!!! (0/3)
  // upper-case to lower case, lower-case to lower-case
  // remove center white space
  // remove minus at start or end
  firstNamePat = '(([A-ZÀ-ÖØ-Ža-zà-öø-ž])[A-ZÀ-ÖØ-Ža-zà-öø-ž\\-]*)';
  lastNamePat =
    '(?:(?:[\\s+]|[\\s|\\-]*)(([A-ZÀ-ÖØ-Ža-zà-öø-ž])[A-ZÀ-ÖØ-Ža-zà-öø-ž\\-]*))*';
  namePat = new RegExp(`${this.firstNamePat}${this.lastNamePat}`);
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  confirmedPassword: string = '';
  hintText = "Your passwords don't match. Please try again.";

  get user() {
    return this.join.user;
  }

  get users() {
    this.join.getUsers();
    return this.join.users;
  }

  // jsdoc
  backToLogin() {
    this.router.navigateByUrl('login');
    if (!this.join.revealed) {
      this.join.revealed = true;
      this.join.relocated = true;
    }
  }

  // improve class name to get the result!!!
  // rename class name to class NameVal!!!
  isNameValid() {
    let name = this.name.match(this.namePat);
    return name ? true : false;
  }

  getNameHint() {
    let name = this.name.match(this.namePat);
    console.log('namePat: ', name);
    console.log('name val: ', new NameVal(this.name));

    if (!name) {
      return 'Enter your name, e. g. Max Mustermann.';
    } else {
      return '';
    }
  }

  // rename + improve!!!
  isValidEmail() {
    if (this.email.match(this.emailPat)) {
      return true;
    } else {
      return false;
    }
  }

  async signUp(ngForm: NgForm) {
    if (ngForm.form.valid) {
      // I. Verify if user (email) exists!
      // ---------------------------------
      // let signee = this.users.find((u) => (u.email = this.user.email));
      // if (signee) {
      //   console.log('User already exists!');
      // }
      // II. Verify passwords!
      // let test = new PasswordVal(this.user.password).getResult();
      // console.log('got pw validation: ', test);
      // III: Sign up!!!
      // ---------------
      // this.signedUp = true;
      // await this.createUser();
      // // myRouterService???
      // console.log('signed up successfully: ', this.user.sid);
      // this.router.navigateByUrl('login/' + this.user.sid);
    }
  }

  // jsdoc
  async createUser() {
    await this.join.addUser().then(() => this.join.subscribeUser());
    await this.join.setSecurityId();
  }

  // jsdoc
  getPasswordPat() {
    if (this.password.match(this.passwordPat)) {
      return new RegExp(this.password);
    } else {
      return this.passwordPat;
    }
  }

  // rename + udpate user values with local values!!!
  isPasswordMatch() {
    let password1 = this.password.match(this.passwordPat);
    let password2 = this.confirmedPassword.match(this.passwordPat);
    let matched = this.password == this.confirmedPassword;
    if (!password1 || !password2 || matched) {
      return true;
    } else {
      return false;
    }
  }

  // verifyPassword() {
  //   let password1 = this.password.match(this.passwordPat);
  //   let password2 = this.confirmedPassword.match(this.passwordPat);
  //   let matched = this.password != this.confirmedPassword;
  //   return password1 && password2 && matched ? true : false;
  // }

  // jsdoc
  getCheck() {
    return this.ppAccepted ? 'checked' : 'check';
  }

  // jsdoc
  accept() {
    this.ppAccepted = !this.ppAccepted ? true : false;
  }

  // jsdoc
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || !this.ppAccepted || this.signedUp;
  }

  // sign up
  // -------
  // classes
  // color variables
  // input error
  // password stars
  // secure form logic

  // input component

  // get token of logged in user
  // set user data of logged in user
  // avoid blinking

  // setInitials() {
  //   this.initials = '';
  //   let names = this.name.split(' ');
  //   if (names.length > 2) {
  //     let temp = names;
  //     names = [temp[0], temp[temp.length - 1]];
  //   }
  //   for (let i = 0; i < names.length; i++) {
  //     let initial = names[i][0];
  //     this.initials += initial;
  //   }
  // }
}
