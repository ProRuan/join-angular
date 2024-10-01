import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JoinService } from '../../shared/services/join.service';
import { UserService } from '../../shared/services/user.service';

// verify!!!
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    // to verify!!!
    JoinLogoComponent,
    LegalLinksComponent,
    InputComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  // user already includes join!!!
  userData: UserService = inject(UserService);

  // think about namePat + review emailPat + review passwordPat!!! (0/3)
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  confirmedPassord: string = '';
  ppAccepted: boolean = false;
  hintText = "Your passwords don't match. Please try again.";

  myInputValue = 'Thank you, ChatGPT!';

  // form validation: https://v17.angular.io/guide/form-validation

  // for small menu!!!
  home() {
    this.router.navigateByUrl('login');
  }

  async signUp(ngForm: NgForm) {
    // verify, if user already exists!!!
    if (ngForm.form.valid) {
      await this.createUser();

      // myRouterService???
      console.log('new user logged in successfully: ', this.join.user.sid);
      this.router.navigateByUrl('login/' + this.join.user.sid);
    }
  }

  async createUser() {
    await this.join.addUser().then(() => this.join.subscribeUser());
    await this.join.setSecurityId();
  }

  // password match not completely working!!!
  getPassword() {
    let password = this.join.user.password;
    if (password.match(this.passwordPat)) {
      return new RegExp(password);
    } else {
      return this.passwordPat;
    }
  }

  verifyPassword() {
    let password = this.join.user.password;
    let password1 = password.match(this.passwordPat);
    let password2 = this.confirmedPassord.match(this.passwordPat);
    let matched = password != this.confirmedPassord;
    return password1 && password2 && matched ? true : false;
  }

  getCheckbox() {
    return this.ppAccepted ? 'checked' : 'check';
  }

  getSrc() {
    if (this.ppAccepted) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  accept() {
    this.ppAccepted = !this.ppAccepted ? true : false;
  }

  // disable button after sign-up!!!
  disable(ngForm: NgForm) {
    return ngForm.form.invalid || !this.ppAccepted;
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
