import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  checked: boolean = false;

  getClass() {
    return this.checked ? 'checked' : 'check';
  }

  // change src folder?!
  getSrc() {
    if (this.checked) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  check() {
    this.checked = !this.checked ? true : false;
  }

  // is that working?
  disable(ngForm: NgForm) {
    return ngForm.form.invalid || !this.checked;
  }
}
