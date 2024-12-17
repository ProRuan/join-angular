import { Component } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-description-input',
  standalone: true,
  imports: [],
  templateUrl: './description-input.component.html',
  styleUrl: './description-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, DescriptionInputComponent),
    getProvider(NG_VALUE_ACCESSOR, DescriptionInputComponent),
  ],
})

/**
 * Represents a description input component.
 * @extends - The BasicInput.
 */
export class DescriptionInputComponent extends BasicInput {}
