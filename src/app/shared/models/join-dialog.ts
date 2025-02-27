import { inject } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { stop } from '../ts/global';

export class JoinDialog {
  dialog: DialogService = inject(DialogService);

  // draggable task: private methods ...
  // rename add-task first to origin ...

  id: string = '';

  /**
   * Gets the css class of a dialog.
   * @returns The css class of the dialog.
   */
  getDialogClass() {
    return this.isOpened() ? '' : 'closed';
  }

  isOpened() {
    return this.dialog.isOpened(this.id);
  }

  /**
   * Gets the css class of a transit container.
   * @returns The css class of the transit container.
   */
  getTransitClass() {
    return this.isOpened() ? '' : 'out';
  }

  onClose() {
    this.dialog.closeDialog(this.id);
  }

  onStop(event: Event) {
    stop(event);
  }
}
