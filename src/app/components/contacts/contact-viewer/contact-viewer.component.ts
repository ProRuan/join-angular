import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BacklogComponent } from '../../../shared/components/backlog/backlog.component';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { contactViewerAnimation } from '../../../shared/animations/contact-viewer.animation';
import { DialogFormController } from '../../../shared/models/dialog-form-controller';
import { JoinService } from '../../../shared/services/join.service';
import { ContactViewerService } from '../../../shared/services/contact-viewer.service';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [
    CommonModule,
    BacklogComponent,
    JoinTitleComponent,
    ButtonComponent,
  ],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
  animations: [contactViewerAnimation],
})

/**
 * Class representing a contact viewer component.
 * @implements {DialogFormController}
 */
export class ContactViewerComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  viewer: ContactViewerService = inject(ContactViewerService);

  override id: string = 'viewContact';

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';
  editBtn = new JoinButton('editBtn');
  deleteBtn = new JoinButton('deleteBtn');
  backlogText: string = 'Contact successfully created';

  /**
   * Gets a contact to view.
   * @returns The contact to view.
   */
  get contact() {
    return this.viewer.contact;
  }

  /**
   * Gets the css class of a backlog.
   * @returns The css class of a backlog.
   */
  getBacklogClass() {
    if (this.dialogs.isLogged()) {
      return 'contact-backlog-in';
    } else {
      return 'contact-backlog-out';
    }
  }

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
    this.viewer.setContact();
  }

  /**
   * Verifies a mobile device.
   * @returns A boolean value.
   */
  isMobile() {
    return this.join.isMobile();
  }

  /**
   * Gets the css class of a contact viewer.
   * @returns The css class of the contact viewer.
   */
  getViewerClass() {
    return this.join.isMobile() ? 'fade' : 'slide';
  }

  /**
   * Opens an edit-contact dialog on click.
   */
  onEdit() {
    this.viewer.cachedContact.set(this.contact);
    this.dialogs.open('editContact');
  }

  /**
   * Manages a contact deletion on click.
   */
  onDelete() {
    this.viewer.manageDeletion();
  }

  /**
   * Opens a contact settings dialog on click.
   */
  onSet() {
    this.dialogs.open('contactSettings');
  }
}
