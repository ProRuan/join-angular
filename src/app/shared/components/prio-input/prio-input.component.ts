import { Component } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { PrioButtonComponent } from '../prio-button/prio-button.component';

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
export class PrioInputComponent {}
