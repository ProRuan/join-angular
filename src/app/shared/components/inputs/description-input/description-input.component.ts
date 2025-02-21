import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-description-input',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './description-input.component.html',
  styleUrl: './description-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, DescriptionInputComponent),
    getProvider(NG_VALUE_ACCESSOR, DescriptionInputComponent),
  ],
})

/**
 * Class representing a description input component.
 * @extends ReactiveInput
 */
export class DescriptionInputComponent extends ReactiveInput {
  @Input() override control: AbstractControl<any, any> | null = null;
}
