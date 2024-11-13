import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasicInput, getProvider } from '../../models/basic-input';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, TextInputComponent),
    getProvider(NG_VALUE_ACCESSOR, TextInputComponent),
  ],
})

/**
 * Represents a text input component.
 * @extends - The BasicInput.
 */
export class TextInputComponent extends BasicInput {
  @Input('name') type: string = 'name';

  /**
   * Initializes the text input component.
   */
  ngOnInit() {
    this.configurateInput(this.type);
  }
}
