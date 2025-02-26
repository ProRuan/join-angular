import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonData } from '../../interfaces/button-data';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

/**
 * Represents a button component.
 */
export class ButtonComponent {
  @Input() button: ButtonData = {
    buttonClass: '',
    textClass: '',
    text: '',
    imgClass: '',
    src: '',
    alt: '',
  };
  @Input() disabled: boolean = false;
}
