import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JoinButton } from '../../models/join-button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

/**
 * Class representing a button component.
 */
export class ButtonComponent {
  @Input() button = new JoinButton();
  @Input() disabled: boolean = false;
}
