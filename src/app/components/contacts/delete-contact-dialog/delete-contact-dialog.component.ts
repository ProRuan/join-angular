import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { ContactService } from '../../../shared/services/contact.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { getObjectArray, stop } from '../../../shared/ts/global';
import { Contact } from '../../../shared/models/contact';
import { FormsModule } from '@angular/forms';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-delete-contact-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordInputComponent, ButtonComponent],
  templateUrl: './delete-contact-dialog.component.html',
  styleUrl: './delete-contact-dialog.component.scss',
})
export class DeleteContactDialogComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'deleteContact';
  password: string = '';
  // passwordPat = this.user.password ...
  resigned: boolean = false;

  noBtn: ButtonData = {
    buttonClass: 'clear-btn no-btn',
    contClass: 'h-24',
    textClass: 'clear-btn-text',
    text: 'No',
    imgClass: 'clear-btn-img',
    src: '/assets/img/add-task/cancel_button.png',
    alt: 'cancel_button',
  };

  yesBtn: ButtonData = {
    buttonClass: 'create-btn yes-btn',
    contClass: 'h-24',
    textClass: 'create-btn-text',
    text: 'Yes',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  get passwordPat() {
    return this.join.user.password;
  }

  isUser() {
    let name = this.viewer.contact.name.toLowerCase();
    return name.includes('you');
  }

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    return !this.dialog.isOpened(this.dialogId) ? 'o-0' : '';
  }

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Closes the dialog on click.
   */
  onClose() {
    this.dialog.close(this.dialogId);
    if (this.resigned) {
      this.resigned = false;
      this.noBtn.text = 'No';
      this.yesBtn.text = 'Yes';
    }
  }

  /**
   * Deletes the task on click.
   */
  async onDelete() {
    let contacts = this.join.user.contacts;
    let index = contacts.findIndex((c) => c.email == this.viewer.contact.email);
    if (index) {
      this.join.user.contacts.splice(index, 1);
      let id = this.join.user.id;
      let convertedContacts = getObjectArray<Contact>(
        this.join.user.contacts,
        Contact
      );
      await this.join.updateUser(id, 'data.contacts', convertedContacts);
      this.join.saveUserLocally();
    }
  }

  /**
   * Provides the task index.
   * @returns - The task index.
   */
  getTaskIndex() {
    // let tasks = this.join.user.tasks;
    // let index = tasks.indexOf(this.board.task);
    // return index;
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialog.transparent = true;
    this.dialog.close(this.dialogId);
    // this.dialog.closeDialog('viewTask');
  }

  /**
   * Deletes the task.
   * @param index - The task index.
   */
  deleteTask(index: number) {
    this.join.user.tasks.splice(index, 1);
  }

  onResign() {
    this.resigned = true;
    this.noBtn.text = 'Keep';
    this.yesBtn.text = 'Delete';
    // reset on close!
    // reset button text!
    // exchange light and dark button for final step!
  }
}
