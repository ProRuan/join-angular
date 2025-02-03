import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { namePattern } from '../../../ts/validate';

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
 * Represents a name input component.
 * @extends ReactiveInput
 */
export class NameInputComponent extends ReactiveInput {
  placeholder: string = 'Name';
  override img: string = 'person';
  pattern: RegExp = namePattern;

  @Input() override control!: FormControl;

  @Input() inputValidators: ValidatorFn[] = [
    Validators.required,
    Validators.pattern(this.pattern),
  ];

  /**
   * Initializes a name input component.
   */
  ngOnInit() {
    this.control = this.fb.control('', this.inputValidators);
  }
}
