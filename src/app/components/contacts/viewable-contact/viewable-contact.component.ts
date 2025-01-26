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
 * Represents a viewable-contact component.
 */
export class ViewableContactComponent {
  viewer: ContactService = inject(ContactService);

  @Input() contact: Contact = new Contact();

  /**
   * Provides the css class.
   * @returns - The css class.
   */
  getClass() {
    let selected = this.isSelected();
    return selected ? 'selected' : '';
  }

  /**
   * Views the contact on click.
   */
  onView() {
    if (!this.isSelected()) {
      this.viewer.setContact(this.contact);
    } else {
      this.viewer.setContact();
    }
  }

  /**
   * Verifies the selected state of the contact.
   * @returns - A boolean value.
   */
  isSelected() {
    let selectedContact = this.viewer.contact;
    return selectedContact.email == this.contact.email;
  }
}
