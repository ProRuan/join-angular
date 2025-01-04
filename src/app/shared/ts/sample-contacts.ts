import { ContactData } from '../interfaces/contact-data';
import { Contact } from '../models/contact';

const SAMPLE_CONTACTS_DATA: ContactData[] = [
  {
    id: '',
    initials: 'AM',
    bgc: 'orange',
    name: 'Anton Mayer',
    email: 'anton.mayer@gmail.com',
    phone: '+49 1111 111 11 1',
  },
  {
    id: '',
    initials: 'AS',
    bgc: 'purple',
    name: 'Anja Schulz',
    email: 'anja.schulz@gmail.com',
    phone: '+49 2222 222 22 2',
  },
  {
    id: '',
    initials: 'BZ',
    bgc: 'blue',
    name: 'Benedikt Ziegler',
    email: 'benedikt.ziegler@gmail.com',
    phone: '+49 3333 333 33 3',
  },
  {
    id: '',
    initials: 'DE',
    bgc: 'magenta',
    name: 'David Eisenberg',
    email: 'david.eisenberg@gmail.com',
    phone: '+49 4444 444 44 4',
  },
  {
    id: '',
    initials: 'EF',
    bgc: 'yellow',
    name: 'Eva Fischer',
    email: 'eva.fischer@gmail.com',
    phone: '+49 5555 555 55 5',
  },
  {
    id: '',
    initials: 'EM',
    bgc: 'green',
    name: 'Emmanuel Mauer',
    email: 'emmanuel.mauer@gmail.com',
    phone: '+49 6666 666 66 6',
  },
  {
    id: '',
    initials: 'MB',
    bgc: 'dark-blue',
    name: 'Marcel Bauer',
    email: 'marcel.bauer@gmail.com',
    phone: '+49 7777 777 77 7',
  },
  {
    id: '',
    initials: 'SM',
    bgc: 'cyan',
    name: 'Sofia Müller',
    email: 'sofia.mueller@gmail.com',
    phone: '+49 8888 888 88 8',
  },
  {
    id: '',
    initials: 'TW',
    bgc: 'red',
    name: 'Tatjana Wolf',
    email: 'tatjana.wolf@gmail.com',
    phone: '+49 9999 999 99 9',
  },
];

const convertedSampleContacts: Contact[] = getSampleContacts();

/**
 * Provides the sample contacts.
 * @returns - The sample contacts.
 */
function getSampleContacts() {
  let contacts: Contact[] = [];
  SAMPLE_CONTACTS_DATA.forEach((contactData) => {
    const contact = new Contact(contactData);
    contacts.push(contact);
  });
  return contacts;
}

export const sampleContacts = convertedSampleContacts;
