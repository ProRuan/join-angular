import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { PrioButtonComponent } from '../prio-button/prio-button.component';
import { PrioService } from '../../services/prio.service';

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
  prio: PrioService = inject(PrioService);

  @Output('prio') prioChange = new EventEmitter<string>();

  /**
   * Sets the prio on click.
   */
  onSetPrio() {
    this.prioChange.emit(this.prio.value);
  }
}
