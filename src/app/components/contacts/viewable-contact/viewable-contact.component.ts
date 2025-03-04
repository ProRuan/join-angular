import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from '../../../shared/models/contact';

@Component({
  selector: 'app-viewable-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewable-contact.component.html',
  styleUrl: './viewable-contact.component.scss',
})

/**
 * Class representing a viewable-contact component.
 */
export class ViewableContactComponent {
  viewer: ContactService = inject(ContactService);

  @Input() contact: Contact = new Contact();

  /**
   * Gets the css class of a contact.
   * @returns The css class of the contact.
   */
  getClass() {
    let selected = this.isSelected();
    return selected ? 'selected' : '';
  }

  /**
   * Verifies the selected state of a contact.
   * @returns A boolean value.
   */
  isSelected() {
    let selectedContact = this.viewer.contact;
    return selectedContact.email == this.contact.email;
  }

  /**
   * Views a contact on click.
   */
  onView() {
    if (!this.isSelected()) {
      this.viewer.setContact(this.contact);
    } else {
      this.viewer.setContact();
    }
  }
}
