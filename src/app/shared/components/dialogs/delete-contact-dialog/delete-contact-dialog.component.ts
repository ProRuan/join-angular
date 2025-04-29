import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { ContactViewerService } from '../../../services/contact-viewer.service';
import { JoinButton } from '../../../models/join-button';
import { Task } from '../../../models/task';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-delete-contact-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './delete-contact-dialog.component.html',

  styleUrl: './delete-contact-dialog.component.scss',
  animations: [dialogAnimation],
})

/**
 * Class representing a delete-contact dialog component.
 * @extends DialogFormController
 */
export class DeleteContactDialogComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  viewer: ContactViewerService = inject(ContactViewerService);

  noBtn = new JoinButton('clearBtn', 'No');
  yesBtn = new JoinButton('createBtn', 'Yes');

  override id: string = 'deleteContact';

  /**
   * Updates the content logic.
   */
  ngAfterViewInit() {
    this.noBtn.updateClass();
    this.yesBtn.updateClass();
  }

  /**
   * Closes a dialog on click.
   */
  onClose(event: Event) {
    this.close(event);
  }

  /**
   * Deletes a contact on click.
   */
  onDelete() {
    let index = this.getContactIndex();
    if (index > -1) {
      this.deleteContact(index);
    }
  }

  /**
   * Gets a contact index.
   * @returns - The contact index.
   */
  getContactIndex() {
    return this.join.user.contacts.indexOf(this.viewer.contact);
  }

  /**
   * Deletes a contact.
   * @param index - The contact index.
   */
  deleteContact(index: number) {
    this.dialogs.fadeOut(() => this.deleteAndSave(index));
  }

  /**
   * Deletes a contact and updates the user.
   * @param index - The contact index.
   */
  deleteAndSave(index: number) {
    const id = this.join.user.contacts[index].id;
    this.closeAllDialogs();
    this.join.deleteUserItem('contacts', index);
    this.viewer.reset();
    this.updateTasks(id);
    this.join.saveUser();
  }

  /**
   * Closes all open dialogs.
   */
  closeAllDialogs() {
    let ids = this.getDialogIds();
    ids.forEach((id) => this.dialogs.close(id));
  }

  /**
   * Gets dialog ids.
   * @returns The dialog ids.
   */
  private getDialogIds() {
    return [this.id, 'editContact', 'contactSettings', 'viewContact'];
  }

  /**
   * Updates user tasks.
   * @param id - The contact id.
   */
  private updateTasks(id: string) {
    this.join.user.tasks.forEach((task) => {
      this.removeContact(task, id);
      this.updateAssignedContacts(task);
    });
  }

  /**
   * Removes an assigned contact from a task.
   * @param task - The task.
   * @param id - The contact id.
   */
  private removeContact(task: Task, id: string) {
    let index = task.assignedTo.findIndex((c) => c.id === id);
    if (index > -1) {
      task.assignedTo.splice(index, 1);
    }
  }

  /**
   * Updates assigned contacts of a task.
   * @param task - The task.
   */
  private updateAssignedContacts(task: Task) {
    task.assignedTo.forEach((assignedContact) => {
      let contact = this.getContact(assignedContact);
      if (contact) {
        assignedContact.bgc = contact.bgc;
      }
    });
  }

  /**
   * Gets a user contact.
   * @param contact - The contact to be compared.
   * @returns The user contact.
   */
  private getContact(contact: Contact) {
    return this.join.user.contacts.find((c) => c.id === contact.id);
  }
}
