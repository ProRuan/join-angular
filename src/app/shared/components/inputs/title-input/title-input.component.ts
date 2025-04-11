import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LabelComponent } from '../../label/label.component';

@Component({
  selector: 'app-title-input',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './title-input.component.html',
  styleUrl: './title-input.component.scss',
  providers: [
    getProvider(NG_VALUE_ACCESSOR, TitleInputComponent),
    getProvider(NG_VALIDATORS, TitleInputComponent),
  ],
})

/**
 * Class representing a title input component.
 * @extends ReactiveInput
 */
export class TitleInputComponent extends ReactiveInput {
  @Input() override control: AbstractControl | null = null;

  override possibleErrors: string[] = ['required'];
}
