import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactService } from '../../../shared/services/contact.service';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
})
export class ContactViewerComponent {
  // rename?!
  viewer: ContactService = inject(ContactService);

  // add contact phone ...
  // add contact viewer transition ...

  get contact() {
    return this.viewer.contact;
  }

  editContact() {}

  // editContact() {
  //   this.decData.setContact(this.currContact);
  //   this.decData.setColor(this.currColor);
  //   this.decData.open();
  // }
}
