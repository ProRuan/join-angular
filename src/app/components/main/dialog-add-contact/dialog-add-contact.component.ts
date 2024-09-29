import { Component, inject } from '@angular/core';
import { DialogAddContactService } from '../../../shared/services/dialog-add-contact.service';

@Component({
  selector: 'app-dialog-add-contact',
  standalone: true,
  imports: [],
  templateUrl: './dialog-add-contact.component.html',
  styleUrl: './dialog-add-contact.component.scss',
})
export class DialogAddContactComponent {
  dacData: DialogAddContactService = inject(DialogAddContactService);

  // double code!!!
  stop(event: Event) {
    event.stopPropagation();
  }
}
