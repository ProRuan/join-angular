import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Contact } from '../../../shared/models/contact';
import { ContactService } from '../../../shared/services/contact.service';

@Component({
  selector: 'app-viewable-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewable-contact.component.html',
  styleUrl: './viewable-contact.component.scss',
})
export class ViewableContactComponent {
  // rename to ContactViewerService?!?
  viewer: ContactService = inject(ContactService);

  // reset selected after click ...
  // hover + active transition ...

  @Input() contact: Contact = new Contact();

  getClass() {
    let selected = this.isSelected();
    return selected ? 'selected' : '';
  }

  isSelected() {
    return this.contact.email == this.viewer.contact.email;
  }

  onView() {
    if (this.viewer.contact != this.contact) {
      this.viewer.contact = this.contact;
    } else {
      // move to contact service!!!
      this.viewer.contact = this.viewer.defaultContact;
    }
  }
}
