import { Component, inject } from '@angular/core';
import { DialogEditContactService } from '../../../shared/services/dialog-edit-contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dialog-edit-contact.component.html',
  styleUrl: './dialog-edit-contact.component.scss',
})
export class DialogEditContactComponent {
  decData: DialogEditContactService = inject(DialogEditContactService);

  stop(event: Event) {
    event.stopPropagation();
  }

  cancel(ngForm: NgForm) {
    ngForm.reset();
  }

  onSave(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.decData.close();
      console.log('saved edited contact');
    } else {
      console.log('contact broken');
    }
  }
}
