import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { PrioButtonComponent } from './prio-button/prio-button.component';

@Component({
  selector: 'app-prio-input',
  standalone: true,
  imports: [LabelComponent, PrioButtonComponent],
  templateUrl: './prio-input.component.html',
  styleUrl: './prio-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, PrioInputComponent),
    getProvider(NG_VALUE_ACCESSOR, PrioInputComponent),
  ],
})

/**
 * Represents a prio input component.
 */
export class PrioInputComponent extends BasicInput {
  @Input('ngModel') override value: string = 'medium';
  @Output('ngModelChange') valueChange = new EventEmitter<string>();

  /**
   * Updates the prio on click.
   * @param prio - The prio.
   */
  onPrioClick(prio: string) {
    this.value = prio;
    this.valueChange.emit(this.value);
  }
}
