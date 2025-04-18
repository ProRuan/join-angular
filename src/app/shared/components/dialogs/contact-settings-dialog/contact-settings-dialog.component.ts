import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { settingsMenuAnimation } from '../../../animations/settings-menu.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { ContactViewerService } from '../../../services/contact-viewer.service';
import { JoinButton } from '../../../models/join-button';

@Component({
  selector: 'app-contact-settings-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-settings-dialog.component.html',
  styleUrl: './contact-settings-dialog.component.scss',
  animations: [settingsMenuAnimation],
})

/**
 * Class representing a contact settings dialog component.
 * @extends {DialogFormController}
 */
export class ContactSettingsDialogComponent extends DialogFormController {
  viewer: ContactViewerService = inject(ContactViewerService);

  override id: string = 'contactSettings';

  editBtn = new JoinButton('contactEditBtn');

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
  }

  /**
   * Gets the css class of a transit container.
   * @returns The css class of the transit container.
   */
  override getTransitClass(): string {
    return this.dialogs.fadedOut ? 'fade' : '';
  }

  /**
   * Gets the css class of a settings dialog.
   * @returns The css class of the settings dialog.
   */
  getDialogClass() {
    let widthClass = this.viewer.isUser() ? 'w-133' : 'w-116';
    let slideClass = this.dialogs.fadedOut ? '' : 'slide';
    return [widthClass, slideClass].filter(Boolean).join(' ');
  }

  /**
   * Verifies the selected state of a settings button.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  isSelected(id: string) {
    return this.dialogs.isOpened(id);
  }

  /**
   * Opens an edit-contact dialog on click.
   */
  onEdit() {
    this.viewer.cachedContact.set(this.viewer.contact);
    this.dialogs.open('editContact');
  }

  /**
   * Manages a contact deletion on click.
   */
  onDelete() {
    this.viewer.manageDeletion();
  }
}
