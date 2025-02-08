import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import { namePatterns } from '../../../ts/pattern';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.scss',
  providers: [
    getProvider(NG_VALUE_ACCESSOR, NameInputComponent),
    getProvider(NG_VALIDATORS, NameInputComponent),
  ],
})

/**
 * Class representing a name input component.
 * @extends ReactiveInput
 */
export class NameInputComponent extends ReactiveInput {
  placeholder: string = 'Name';
  patterns = namePatterns;

  override img: string = 'person';

  @Input() override control: AbstractControl | null = null;

  @Input() override inputValidators: ValidatorFn[] = [
    this.validator.required(),
    this.validator.forbidden(this.patterns.forbidden),
    this.validator.minLength(2),
    this.validator.sequence(this.patterns.sequence),
    this.validator.name(this.patterns.name),
    this.validator.maxLength(127),
  ];

  /**
   * Initializes a name input component.
   */
  ngOnInit() {
    this.control?.setValidators(this.inputValidators);
  }
}
