import { TaskData } from '../interfaces/task-data';
import { getMonthName } from './global';

const urgentDay: number = 25;
const month: string = getMonth();
const year: string = getYear();

const SAMPLE_TASKS_DATA: TaskData[] = [
  {
    id: '68xQNU6PAcO6XiiF0xMS',
    title: 'Join Frontend',
    description: 'Create your own Join Frontend as Angular App.',
    assignedTo: [
      {
        id: 'g81A8pSrM5FXwa3C6t8P',
        initials: 'EF',
        bgc: 'yellow',
        name: 'Eva Fischer',
        email: 'eva.fischer@gmail.com',
        phone: '+49 5555 555 55 5',
      },
      {
        id: 'u8G4BlpT6KiQfXuHYShJ',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
      {
        id: 'B8PWxavUMNKgccHkaPfi',
        initials: 'MB',
        bgc: 'dark-blue',
        name: 'Marcel Bauer',
        email: 'marcel.bauer@gmail.com',
        phone: '+49 7777 777 77 7',
      },
      {
        id: 'YpiPMbOaCklSoanhQMiH',
        initials: 'TW',
        bgc: 'red',
        name: 'Tatjana Wolf',
        email: 'tatjana.wolf@gmail.com',
        phone: '+49 9999 999 99 9',
      },
    ],
    dueDate: getDueDate(urgentDay),
    prio: 'urgent',
    category: 'User Story',
    subtasks: [
      { id: 0, text: 'Create your app', done: true, focused: false },
      { id: 1, text: 'Ask for feedback', done: false, focused: false },
    ],
    column: 'in-progress',
  },
  {
    id: 'tBWM3az6GXuMW4jESCCq',
    title: 'Animation',
    description:
      'Implement animations by the Angular Browser Animation Module.',
    assignedTo: [
      {
        id: 'DIRFv5TNFmpSoDqJ8H6A',
        initials: 'AM',
        bgc: 'orange',
        name: 'Anton Mayer',
        email: 'anton.mayer@gmail.com',
        phone: '+49 1111 111 11 1',
      },
      {
        id: 'tdwNk9K7bknXIzGuH58T',
        initials: 'AS',
        bgc: 'purple',
        name: 'Anja Schulz',
        email: 'anja.schulz@gmail.com',
        phone: '+49 2222 222 22 2',
      },
    ],
    dueDate: getDueDate(20),
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Animate logo', done: true, focused: false },
      { id: 1, text: 'Animate dialogs', done: true, focused: false },
      { id: 2, text: 'Animate backlog', done: true, focused: false },
    ],
    column: 'done',
  },
  {
    id: 'Rbk1LKDte4mA7oyKJoXh',
    title: 'Reactive Forms',
    description: 'Implement reactive forms by the Reactive Form Module.',
    assignedTo: [
      {
        id: 'leEeuqQPcyk3Gk9H2Lli',
        initials: 'BZ',
        bgc: 'blue',
        name: 'Benedikt Ziegler',
        email: 'benedikt.ziegler@gmail.com',
        phone: '+49 3333 333 33 3',
      },
      {
        id: 'u8G4BlpT6KiQfXuHYShJ',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
    ],
    dueDate: getDueDate(16),
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Implement login form', done: true, focused: false },
      { id: 1, text: 'Implement sign-up form', done: true, focused: false },
      { id: 2, text: 'Implement task forms', done: true, focused: false },
      { id: 3, text: 'Implement contact forms', done: true, focused: false },
    ],
    column: 'done',
  },
  {
    id: 'OJSM2UnIXmjL5Uf6KvoN',
    title: 'Real-Time Data Exchange',
    description: 'Enable real-time data exchange by using Firestore Snapshots.',
    assignedTo: [
      {
        id: 'g81A8pSrM5FXwa3C6t8P',
        initials: 'EF',
        bgc: 'yellow',
        name: 'Eva Fischer',
        email: 'eva.fischer@gmail.com',
        phone: '+49 5555 555 55 5',
      },
      {
        id: 'mj9NjizyCjV7npjB95Ae',
        initials: 'SM',
        bgc: 'cyan',
        name: 'Sofia Müller',
        email: 'sofia.mueller@gmail.com',
        phone: '+49 8888 888 88 8',
      },
    ],
    dueDate: getDueDate(23),
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Subscribe user collection', done: true, focused: false },
      { id: 1, text: 'Subscribe user', done: true, focused: false },
    ],
    column: 'await-feedback',
  },
  {
    id: 'OiVQS2rB17CgOrNhvnC9',
    title: 'Join Backend',
    description: 'Create your own Join Backend as Django App.',
    assignedTo: [
      {
        id: 'leEeuqQPcyk3Gk9H2Lli',
        initials: 'BZ',
        bgc: 'blue',
        name: 'Benedikt Ziegler',
        email: 'benedikt.ziegler@gmail.com',
        phone: '+49 3333 333 33 3',
      },
      {
        id: 'X84jRXMNPbWMparRcUO7',
        initials: 'DE',
        bgc: 'magenta',
        name: 'David Eisenberg',
        email: 'david.eisenberg@gmail.com',
        phone: '+49 4444 444 44 4',
      },
      {
        id: 'u8G4BlpT6KiQfXuHYShJ',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
    ],
    dueDate: getDueDate(28),
    prio: 'low',
    category: 'User Story',
    subtasks: [
      { id: 0, text: 'Create app', done: false, focused: false },
      { id: 1, text: 'Ask for feedback', done: false, focused: false },
    ],
    column: 'to-do',
  },
];

/**
 * Gets an up-to-date month.
 * @returns The month.
 */
function getMonth() {
  let m = new Date().getMonth() + 1;
  return m < 10 ? `0${m}` : m.toString();
}

/**
 * Gets an up-to-date year.
 * @returns The year.
 */
function getYear() {
  return new Date().getFullYear().toString();
}

/**
 * Gets a due date.
 * @param day - The day to set.
 * @returns The due date.
 */
function getDueDate(day: number) {
  return `${day}/${month}/${year}`;
}

export const sampleTasksData = SAMPLE_TASKS_DATA;

/**
 * Gets an upcoming deadline.
 * @returns The upcoming deadline.
 */
export function getDeadline() {
  let m = Number(month);
  let monthName = getMonthName(m);
  return `${monthName} ${urgentDay}, ${year}`;
}
