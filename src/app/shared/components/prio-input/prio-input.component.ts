import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { PrioButtonComponent } from './prio-button/prio-button.component';

@Component({
  selector: 'app-prio-input',
  standalone: true,
  imports: [LabelComponent, PrioButtonComponent],
  templateUrl: './prio-input.component.html',
  styleUrl: './prio-input.component.scss',
})

/**
 * Represents a prio input component.
 */
export class PrioInputComponent {
  @Input() prio: string = 'medium';
  @Output() prioChange = new EventEmitter<string>();

  /**
   * Updates the prio on click.
   * @param prio - The prio.
   */
  onPrioClick(prio: string) {
    this.prio = prio;
    this.prioChange.emit(this.prio);
  }
}
