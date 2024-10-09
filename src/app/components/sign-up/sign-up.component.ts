import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { PasswordVal } from '../../shared/models/password-val';

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

  passwordCheck = [
    {
      name: 'lower case',
      pattern: /[a-z]/,
      valid: false,
    },
    {
      name: 'upper case',
      pattern: /[A-Z]/,
      valid: false,
    },
    {
      name: 'digit',
      pattern: /[0-9]/,
      valid: false,
    },
    {
      name: 'special character',
      pattern: /[!@#$%^&*]/,
      valid: false,
    },
  ];

  // verify!!!
  ppAccepted: boolean = false;
  signedUp: boolean = false;

  // think about namePat + review emailPat + review passwordPat!!! (0/3)
  emailPatNew = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  confirmedPassord: string = '';
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

  async signUp(ngForm: NgForm) {
    // verify, if user already exists!!!
    if (ngForm.form.valid) {
      // let signee = this.users.find((u) => (u.email = this.user.email));
      // if (signee) {
      //   console.log('User already exists!');
      // }

      if (this.emailPatNew.test(this.user.password)) {
        this.passwordCheck.forEach((group) => {
          if (group.pattern.test(this.user.password)) {
            group.valid = true;
            console.log('includes at least one ', group.name);
          }
        });

        let test = new PasswordVal(this.user.password).getResult();
        console.log('got pw validation: ', test);

        // activate!!!
        // -----------
        // this.signedUp = true;
        // await this.createUser();

        // // myRouterService???
        // console.log('signed up successfully: ', this.user.sid);
        // this.router.navigateByUrl('login/' + this.user.sid);
      }
    }
  }

  // jsdoc
  async createUser() {
    await this.join.addUser().then(() => this.join.subscribeUser());
    await this.join.setSecurityId();
  }

  // password match not completely working!!!
  getPassword() {
    let password = this.user.password;
    if (password.match(this.passwordPat)) {
      return new RegExp(password);
    } else {
      return this.passwordPat;
    }
  }

  verifyPassword() {
    let password = this.user.password;
    let password1 = password.match(this.passwordPat);
    let password2 = this.confirmedPassord.match(this.passwordPat);
    let matched = password != this.confirmedPassord;
    return password1 && password2 && matched ? true : false;
  }

  // jsdoc
  getCheckbox() {
    return this.ppAccepted ? 'checked' : 'check';
  }

  // jsdoc
  accept() {
    this.ppAccepted = !this.ppAccepted ? true : false;
  }

  // disable button after sign-up!!!
  disable(ngForm: NgForm) {
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
