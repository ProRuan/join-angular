import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { getProvider } from '../../../shared/models/reactive-input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JoinService } from '../../../shared/services/join.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers: [getProvider(NG_VALUE_ACCESSOR, SearchInputComponent)],
})

/**
 * Class representing a search input component.
 * @implements {ControlValueAccessor}
 */
export class SearchInputComponent implements ControlValueAccessor {
  join: JoinService = inject(JoinService);

  @Input() value: string = '';
  @Input() noResult: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Writes an input value.
   * @param value - The value to write.
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   * Registers a function to be called on change.
   * @param fn - The function to register.
   */
  registerOnChange(fn: any): void {
    this.onChange(fn);
  }

  /**
   * Updates an input value on change.
   * @param value - The value to set.
   */
  onChange(value: string) {
    this.update(value);
  }

  /**
   * Updates an input value.
   */
  update(value: string) {
    this.valueChange.emit(value);
  }

  /**
   * Registers a function to be called on touched.
   * @param fn - The function to register.
   */
  registerOnTouched(fn: any): void {}

  /**
   * Updates a value change on input.
   * @param event - The event.
   */
  onInput(event: Event) {
    let input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  /**
   * Gets the css class of a search input.
   * @returns The css class of the search input.
   */
  getClass() {
    return this.join.isMobile() && this.noResult ? 'h-72' : 'h-48';
  }

  /**
   * Updates an input value on event.
   */
  onUpdate() {
    this.update(this.value);
  }
}
