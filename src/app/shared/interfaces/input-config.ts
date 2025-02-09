import { AbstractControl } from '@angular/forms';

/**
 * Interface representing an input configuration.
 */
export interface InputConfig {
  placeholder: string;
  img: string;
  control: AbstractControl | null;
}
