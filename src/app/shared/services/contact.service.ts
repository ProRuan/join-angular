import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contact: Contact = new Contact();
  defaultContact: Contact = new Contact();
}
