import { Component } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-title-input',
  standalone: true,
  imports: [],
  templateUrl: './title-input.component.html',
  styleUrl: './title-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, TitleInputComponent),
    getProvider(NG_VALUE_ACCESSOR, TitleInputComponent),
  ],
})

/**
 * Represents a title input component.
 * @extends - The BasicInput.
 */
export class TitleInputComponent extends BasicInput {}
