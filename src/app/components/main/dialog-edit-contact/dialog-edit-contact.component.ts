import { Component, inject } from '@angular/core';
import { DialogEditContactService } from '../../../shared/services/dialog-edit-contact.service';

@Component({
  selector: 'app-dialog-edit-contact',
  standalone: true,
  imports: [],
  templateUrl: './dialog-edit-contact.component.html',
  styleUrl: './dialog-edit-contact.component.scss',
})
export class DialogEditContactComponent {
  decData: DialogEditContactService = inject(DialogEditContactService);

  stop(event: Event) {
    event.stopPropagation();
  }
}
