import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { BasicInput } from '../../models/basic-input';
import { InputConfigurationService } from '../../services/input-configuration.service';
import { PasswordInput } from '../../models/password-input';

@Component({
  selector: 'app-super-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './super-input.component.html',
  // templateUrl: './templates/name-email-input.component.html',
  styleUrl: './super-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuperInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SuperInputComponent),
      multi: true,
    },
  ],
})
export class SuperInputComponent extends PasswordInput {
  configurator: InputConfigurationService = inject(InputConfigurationService);

  @ViewChild('textTemplate', { static: true })
  textTemplate: TemplateRef<any> | null = null;
  @ViewChild('passwordTemplate', { static: true })
  passwordTemplate: TemplateRef<any> | null = null;

  templateToShow: TemplateRef<any> | null = null;

  @Input('name') type: string = 'name';
  @Input('pattern') override pattern: string = '';
  control: any;

  ngOnInit() {
    this.setTemplate();
    let input = this.configurator.getInputType(this.type);
    // this.configurate(input);
    if (this.type == 'matchword' || this.type == 'password') {
      this.placeholder = input.placeholder;
      if (this.type == 'password') {
        this.pattern = input.pattern;
      }
      this.required = input.required;
      this.img = input.img;
      if (this.type == 'password') {
        this.hint = () => input.hint(this.value);
      } else {
        this.hint = () => input.hint(this.pattern, this.value);
      }
      this.charSet = input.getCharSet;
      if (this.type == 'password') {
        this.isInvalid = () => input.isInvalid(this.value);
      } else {
        this.isInvalid = () => input.isInvalid(this.pattern, this.value);
      }
    } else {
      this.configurate(input);
    }
  }

  setTemplate() {
    if (this.type === 'password' || this.type === 'matchword') {
      this.templateToShow = this.passwordTemplate;
    } else {
      this.templateToShow = this.textTemplate;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control; // Store reference to control
    if (this.required && !control.value) {
      return { required: true };
    }
    if (this.pattern && !new RegExp(this.pattern).test(control.value)) {
      return { pattern: true };
    }
    return null;
  }

  getContClass() {
    let lastInput = this.type == 'matchword';
    if (this.isLocked()) {
      return 'semi-opacity h-70';
    } else if (lastInput || this.isHintDisplayed()) {
      return 'h-70';
    } else {
      return 'h-48';
    }
  }

  isLocked() {
    if (this.type == 'matchword') {
      return this.configurator.passwordVal.isInvalid(this.pattern);
    } else {
      return false;
    }
  }
}
