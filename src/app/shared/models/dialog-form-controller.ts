import { inject } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { FormController } from './form-controller';
import { stopPropagation } from '../ts/global';

/**
 * Class representing a dialog form controller.
 * @extends FormController
 */
export class DialogFormController extends FormController {
  dialogs: DialogService = inject(DialogService);

  id: string = '';

  /**
   * Verifies the opened state of a dialog.
   * @returns A boolean value.
   */
  isOpened() {
    return this.dialogs.isOpened(this.id);
  }

  /**
   * Gets the css class of a transit container.
   * @returns The css class of the transit container.
   */
  getTransitClass(): string {
    const fade = this.isFadeClass();
    return fade ? 'fade' : 'slide';
  }

  /**
   * Verifies the fade class of a dialog.
   * @returns A boolean value.
   */
  isFadeClass() {
    return this.dialogs.submitted || this.dialogs.fadedOut;
  }

  /**
   * Closes a dialog.
   * @param event - The event.
   */
  close(event?: Event) {
    this.dialogs.close(this.id);
    stopPropagation(event);
  }

  /**
   * Stops an event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stopPropagation(event);
  }
}
