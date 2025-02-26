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
import { ContactService } from '../../../shared/services/contact.service';

@Component({
  selector: 'app-edit-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss',
})
export class EditContactDialogComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);
  dialog: DialogService = inject(DialogService);

  // gap logo-title ... ?
  // saveBtn --> disabled, if empty ... !

  title: string = 'Edit contact';
  dialogId: string = 'editContact';

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

  isOpened() {
    return this.dialog.isOpened(this.dialogId);
  }

  onClose() {
    this.cancel();
  }

  cancel() {
    this.dialog.close(this.dialogId);
    this.viewer.cachedContact = new Contact();
  }

  onStop(event: Event) {
    stop(event);
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
