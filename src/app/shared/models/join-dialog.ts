import { inject } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { stop } from '../ts/global';
import { FormController } from './form-controller';

export class JoinDialog extends FormController {
  dialog: DialogService = inject(DialogService);

  // create a join component ... !!!
  //   --> including form controller, join dialog, user getters and setters ...
  // review all components for Input + ngOnChanges ... !

  // summary or sum card: format deadline ... !!!

  // rename JoinDialog and FormController ... !
  // FormController and DialogFormController ... ?

  // dialogs: animation by browser animation or scss ... !

  id: string = '';

  /**
   * Gets the css class of a dialog.
   * @returns The css class of the dialog.
   */
  getDialogClass(): string {
    return this.isOpened() ? '' : 'closed';
  }

  isOpened() {
    return this.dialog.isOpened(this.id);
  }

  /**
   * Gets the css class of a transit container.
   * @returns The css class of the transit container.
   */
  getTransitClass(): string {
    return this.isOpened() ? '' : 'out';
  }

  onClose() {
    this.dialog.closeDialog(this.id);
  }

  onStop(event: Event) {
    stop(event);
  }
}
