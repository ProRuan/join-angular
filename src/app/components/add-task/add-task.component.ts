import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  mainComponent: MainComponent = inject(MainComponent);
  sessionToken: string = '';
  codes: string[] = [];

  async ngOnInit() {
    let summaryToken = await this.mainComponent.getUserToken();
    console.log('add-task token new: ', summaryToken);
    this.showChar();
    console.log('character: ', this.sessionToken);
    console.log('codes: ', this.codes);
    this.createSessionToken();
  }

  showChar() {
    // digits
    for (let i = 48; i < 48 + 10; i++) {
      this.sessionToken += String.fromCharCode(i);
      this.codes.push(String.fromCharCode(i));
    }

    // upper case verified
    for (let i = 65; i < 65 + 26; i++) {
      this.sessionToken += String.fromCharCode(i);
      this.codes.push(String.fromCharCode(i));
    }

    // lower case verified
    for (let i = 97; i < 97 + 26; i++) {
      this.sessionToken += String.fromCharCode(i);
      this.codes.push(String.fromCharCode(i));
    }
  }

  createSessionToken() {
    this.sessionToken = '';
    for (let i = 0; i < 20; i++) {
      let index;
      if (i == 0) {
        index = Math.round(1 + Math.random() * 60);
      } else {
        index = Math.round(Math.random() * 61);
        // console.log('code: ', code);
      }
      this.sessionToken += this.codes[index];
    }
    console.log('session token created: ', this.sessionToken);
    console.log('session token length: ', this.sessionToken.length);
  }

  // token sample: jHKN 8tfn W2yA Qbjk MiNy
}
