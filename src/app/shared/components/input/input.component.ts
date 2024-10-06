import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})

/**
 * Represents an input component.
 * @implements - The ControlValueAccessor.
 */
export class InputComponent implements ControlValueAccessor {
  value: string = '';
  @Input() placeholder: string = '';
  @Input() img: string = '';
  @Input() condition: boolean = false;
  @Input() hintText: string = '';

  /**
   * Registers the function to be called on change.
   * @param fn - The function to register.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Updates the model on change.
   * @param value - The value to update.
   */
  onChange(value: string) {}

  /**
   * Registers the function to be called on touched.
   * @param fn - The function to register.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Marks the model as touched.
   */
  onTouched() {}

  /**
   * Writes the input value.
   * @param value - The value to write.
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return '../../../../assets/img/global/' + this.img;
  }

  /**
   * Updates the input value on change.
   * @param event - The event which occurs on change.
   */
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
