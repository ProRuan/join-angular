import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputConfig } from '../../../interfaces/input-config';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    getProvider(NG_VALUE_ACCESSOR, TextInputComponent),
    getProvider(NG_VALIDATORS, TextInputComponent),
  ],
})

/**
 * Class representing a text input component.
 */
export class TextInputComponent extends ReactiveInput {
  @Input() set config(config: InputConfig) {
    this.set(config);
  }
}
