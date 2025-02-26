import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Contact } from '../../../shared/models/contact';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { getObjectArray, stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss',
})
export class AddContactDialogComponent {
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
  dialogId: string = 'addContact';
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

  isOpened() {
    return this.dialog.isOpened(this.dialogId);
  }

  onClose() {
    this.cancel();
  }

  cancel() {
    this.dialog.close(this.dialogId);
    this.contact = new Contact();
  }

  onStop(event: Event) {
    stop(event);
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
