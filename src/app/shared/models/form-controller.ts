import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { InputConfig } from '../interfaces/input-config';

/**
 * Class representing a form controller.
 */
export class FormController {
  fb: FormBuilder = inject(FormBuilder);

  form: FormGroup;
  config: InputConfig[];

  /**
   * Creates a form controller.
   */
  constructor() {
    this.form = this.getForm();
    this.config = [];
  }

  /**
   * Gets a form.
   * @returns The form.
   */
  getForm() {
    return this.fb.group({});
  }

  /**
   * Adds a form control.
   * @param name - The form control name.
   * @param value - The form control value.
   * @param validators - The form control validators.
   */
  addControl(name: string, value: string, validators: ValidatorFn[]) {
    let control = new FormControl(value, validators);
    this.form.addControl(name, control);
  }

  /**
   * Adds an input configuration.
   * @param placeholder - The input placeholder.
   * @param img - The input image.
   * @param valOff - A boolean value.
   */
  addInputConfig(placeholder: string, img: string, valOff: boolean = false) {
    const inputConfig = { placeholder, img, valOff };
    this.config.push(inputConfig);
  }

  /**
   * Gets a form control.
   * @param name - The form control name.
   * @returns The form control.
   */
  get(name: string) {
    return this.form.get(name);
  }

  /**
   * Gets a form control value.
   * @param name - The form control name.
   * @returns The form control value.
   */
  getValue(name: string) {
    return this.form.get(name)?.value;
  }

  /**
   * Sets the value of a form control.
   * @param name - The form control name.
   * @param value - The value to set.
   */
  setValue(name: string, value: string) {
    this.form.get(name)?.setValue(value);
  }
}
