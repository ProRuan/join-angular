import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { settingsMenuAnimation } from '../../../animations/settings-menu.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { ContactService } from '../../../services/contact.service';
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
  viewer: ContactService = inject(ContactService);

  override id: string = 'contactSettings';

  editBtn = new JoinButton('editBtn');
  deleteBtn = new JoinButton('deleteBtn');

  /**
   * Initializes a contact settings dialog component.
   */
  ngOnInit() {
    this.setMobileButtons();
  }

  /**
   * Sets mobile buttons.
   */
  setMobileButtons() {
    let buttonClass = 'mobile-settings-btn';
    this.editBtn.buttonClass = buttonClass;
    this.deleteBtn.buttonClass = buttonClass;
  }

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
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
   * Opens a delete-contact dialog on click.
   */
  onDelete() {
    this.dialogs.open('deleteContact');
  }
}
