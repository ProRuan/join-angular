import { Component } from '@angular/core';
import { PrioButtonComponent } from '../prio-button/prio-button.component';

@Component({
  selector: 'app-prio-input',
  standalone: true,
  imports: [PrioButtonComponent],
  templateUrl: './prio-input.component.html',
  styleUrl: './prio-input.component.scss'
})
export class PrioInputComponent {

}
