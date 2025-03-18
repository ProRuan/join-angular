import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

/**
 * Class representing a form controller.
 */
export class FormController {
  fb: FormBuilder = inject(FormBuilder);

  form: FormGroup;

  /**
   * Creates a form controller.
   */
  constructor() {
    this.form = this.getForm();
  }

  /**
   * Gets a form.
   * @returns The form.
   */
  getForm() {
    return this.fb.group({});
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
  setValue(name: string, value: any) {
    this.form.get(name)?.setValue(value);
  }

  /**
   * Registers a form control.
   * @param name - The form control name.
   * @param value - The form control value.
   * @param validators - The form control validators.
   */
  registerControl(name: string, value: any, validators: ValidatorFn[] = []) {
    let control = this.getControl(value, validators);
    this.form.registerControl(name, control);
  }

  /**
   * Gets a form control.
   * @param value - The form control value.
   * @param validators - The form control validators.
   * @returns The form control.
   */
  getControl(value: any, validators: ValidatorFn[] = []) {
    return new FormControl(value, validators);
  }

  /**
   * Adds a form control.
   * @param name - The form control name.
   * @param value - The form control value.
   * @param validators - The form control validators.
   */
  addControl(name: string, value: any, validators: ValidatorFn[] = []) {
    let control = this.getControl(value, validators);
    this.form.addControl(name, control);
  }

  /**
   * Removes a form control.
   * @param name - The form control name.
   */
  removeControl(name: string) {
    this.form.removeControl(name);
  }

  /**
   * Verifies the existence of a form control.
   * @param name - The form control name.
   * @returns A boolean value.
   */
  isControl(name: string) {
    return !!this.get(name);
  }
}
