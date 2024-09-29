import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-viewable-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewable-contact.component.html',
  styleUrl: './viewable-contact.component.scss',
})
export class ViewableContactComponent {
  @Input() contact = {
    initials: 'AM',
    name: 'Anton Mayer',
    email: 'antonm@gmail.com',
  };
  // add color to contact object?!?
  @Input() color: string = 'orange';

  @Output() viewableContact = new EventEmitter<any>();

  viewContact() {
    this.viewableContact.emit({ contact: this.contact, color: this.color });
  }
}
