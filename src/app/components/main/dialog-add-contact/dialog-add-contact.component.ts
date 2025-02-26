import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { getObjectArray, stop } from '../../../shared/ts/global';
import { FormsModule, NgForm } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Contact } from '../../../shared/models/contact';
import { DialogService } from '../../../shared/services/dialog.service';
import { JoinService } from '../../../shared/services/join.service';

@Component({
  selector: 'app-dialog-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './dialog-add-contact.component.html',
  styleUrl: './dialog-add-contact.component.scss',
})
export class DialogAddContactComponent {
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);

  // input height: 50px ... ?
  // InputConfigurationService --> set phone input ...
  // CloseButtonComponent ... !
  // imgClasses: 24, 32, 64 ...
  // ProfileComponent with name and email ... ?

  // transition ... !
  // button validation ... (0/2)

  title: string = 'Add contact';
  subtitle: string = 'Tasks are better with a team!';

  contact: Contact = new Contact();

  // disabled?
  cancelBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Cancel',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  // disabled?
  createBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Create contact',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  onStop(event: Event) {
    stop(event);
  }

  onClose() {
    this.close();
  }

  close() {
    this.dialog.close('addContact');
  }

  onCancel() {
    this.close();
    this.contact = new Contact();
  }

  async onCreate(ngForm: NgForm) {
    // if ngForm.form.valid!!!
    // set contact complete (with initials)!!!
    this.join.user.contacts.push(this.contact);
    let id = this.join.user.id;
    let contacts = getObjectArray<Contact>(this.join.user.contacts, Contact);
    console.log('contacts: ', contacts);

    await this.join.updateUser(id, 'data.contacts', contacts);
    this.join.saveUserLocally();
    // real time update!!!
    // close and reset!!!
  }
}
