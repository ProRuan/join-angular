import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Contact } from '../../../shared/models/contact';
import { ButtonData } from '../../../shared/interfaces/button-data';
import {
  getObjectArray,
  isDefaultString,
  stop,
} from '../../../shared/ts/global';
import { ContactService } from '../../../shared/services/contact.service';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss',
})
export class ContactDialogComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);
  dialog: DialogService = inject(DialogService);

  // input height: 50px ... ?
  // InputConfigurationService --> set phone input ...
  // CloseButtonComponent ... !
  // imgClasses: 24, 32, 64 ...
  // ProfileComponent with name and email ... ?

  // transition ... !
  // button validation ... (0/2)

  @Input() dialogId: string = 'addContact';

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

  deleteBtn: ButtonData = {
    buttonClass: 'clear-btn',
    textClass: 'clear-btn-text',
    text: 'Delete',
    imgClass: 'delete-btn-img',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  // disabled?
  saveBtn: ButtonData = {
    buttonClass: 'create-btn',
    textClass: 'create-btn-text',
    text: 'Save',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  get contact() {
    return this.viewer.cachedContact;
  }

  get title() {
    return this.dialog.title;
  }

  get subtitle() {
    return this.dialog.subtitle;
  }

  isOpened() {
    return this.dialog.isOpened(this.dialogId);
  }

  onClose() {
    this.cancel();
  }

  cancel() {
    this.dialog.close(this.dialogId);
    this.dialog.title = '';
    this.dialog.subtitle = '';
    this.viewer.cachedContact = new Contact();
  }

  onStop(event: Event) {
    stop(event);
  }

  getBgcClass() {
    let empty = isDefaultString(this.contact.bgc);
    return !empty ? this.contact.bgc : 'bgc-gray';
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

  onDelete() {
    this.dialog.open('deleteContact');
  }

  async onSave(ngForm: NgForm) {
    // // if ngForm.form.valid!!!
    this.viewer.contact.set(this.contact);
    let id = this.join.user.id;
    let contacts = getObjectArray<Contact>(this.join.user.contacts, Contact);
    console.log('contacts: ', contacts);
    await this.join.updateUser(id, 'data.contacts', contacts);
    this.join.saveUserLocally();
    this.cancel();
  }
}
