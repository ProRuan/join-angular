import { Injectable } from '@angular/core';
import { InputConfig } from '../interfaces/input-config';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing an input configuration service.
 */
export class InputConfigurationService {
  name: InputConfig = {
    placeholder: 'Name',
    img: 'person',
    valOff: false,
    possibleErrors: [
      'required',
      'forbidden',
      'minLength',
      'sequence',
      'name',
      'maxLength',
    ],
  };

  email: InputConfig = {
    placeholder: 'Email',
    img: 'email',
    valOff: false,
    possibleErrors: [
      'required',
      'forbidden',
      'minLength',
      'email',
      'maxLength',
    ],
  };

  password: InputConfig = {
    placeholder: 'Password',
    img: 'lock',
    valOff: false,
    possibleErrors: [
      'required',
      'forbidden',
      'minLegnth',
      'upperCase',
      'lowerCase',
      'digit',
      'specialChar',
      'maxLength',
    ],
  };

  matchword: InputConfig = {
    placeholder: 'Confirm Password',
    img: 'lock',
    valOff: false,
    possibleErrors: [
      'required',
      'forbidden',
      'minLegnth',
      'matchword',
      'maxLength',
    ],
  };

  loginEmail: InputConfig = {
    placeholder: 'Email',
    img: 'email',
    valOff: true,
  };

  loginWord: InputConfig = {
    placeholder: 'Password',
    img: 'lock',
    valOff: true,
  };

  dueDate = {
    possibleErrors: [
      'required',
      'forbidden',
      'dueDate',
      'invalidDate',
      'minDate',
    ],
  };

  phone: InputConfig = {
    placeholder: 'Phone',
    img: 'phone',
    valOff: false,
    possibleErrors: ['forbidden', 'phone', 'maxLength'],
  };
}
