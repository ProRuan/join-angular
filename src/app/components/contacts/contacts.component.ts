import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactDialogComponent,
    DeleteContactDialogComponent,
    ContactListComponent,
    JoinTitleComponent,
    ContactViewerComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

/**
 * Represents a contact component.
 */
export class ContactsComponent {
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);

  // rename contacts service to contact viewer service ... ?
  // move viewable contact component to contact list ... ?

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';

  /**
   * Provides the user contacts.
   * @returns - The user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  get dialogId() {
    return this.dialog.dialogId;
  }
}
