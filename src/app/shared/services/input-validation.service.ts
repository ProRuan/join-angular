import { Injectable } from '@angular/core';
import { NameValidationService } from './name-validation.service';
import { EmailValidationService } from './email-validation.service';
import { PasswordValidationService } from './password-validation.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents an input validation service.
 */
export class InputValidationService {}

export const nameVal = new NameValidationService();
export const emailVal = new EmailValidationService();
export const passwordVal = new PasswordValidationService();
