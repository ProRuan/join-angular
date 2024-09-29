import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-viewable-contact',
  standalone: true,
  imports: [],
  templateUrl: './viewable-contact.component.html',
  styleUrl: './viewable-contact.component.scss',
})
export class ViewableContactComponent {
  @Input() contact = {
    initials: 'AM',
    name: 'Anton Mayer',
    email: 'antonm@gmail.com',
  };

  @Output() viewableContact = new EventEmitter<any>();

  viewContact() {
    this.viewableContact.emit(this.contact);
  }
}
