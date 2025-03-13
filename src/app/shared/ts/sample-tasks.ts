import { TaskData } from '../interfaces/task-data';
import { Task } from '../models/task';

// think about ContactService ...
// think about sample task values ... !
// fix subtask checkbox: save after close ... ?
// limit draggable-task text ... !
// fix add-task stop/close event ... !

// ---------------------
// check leading components ...

// check components ...
// check scripts ...
// ---------------------

// check other missing files (folder by folder) ...

const SAMPLE_TASKS_DATA: TaskData[] = [
  {
    id: '68xQNU6PAcO6XiiF0xMS',
    title: 'Join Frontend',
    description: 'Create your own Join Frontend as Angular App.',
    assignedTo: [
      {
        id: 'pADfjSRNHYdJZOyrEiXl',
        initials: 'JA',
        bgc: 'lightblue',
        name: 'Join Admin (You)',
        email: 'admin@mail.com',
        phone: '',
      },
      {
        id: 'tQ0rTKIGUrcrCCjWDmYu',
        initials: 'EF',
        bgc: 'yellow',
        name: 'Eva Fischer',
        email: 'eva.fischer@gmail.com',
        phone: '+49 5555 555 55 5',
      },
      {
        id: '7MimBaQNd4cmekxpVGbi',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
      {
        id: '8yc0YqZWEsE1taivpKub',
        initials: 'TW',
        bgc: 'red',
        name: 'Tatjana Wolf',
        email: 'tatjana.wolf@gmail.com',
        phone: '+49 9999 999 99 9',
      },
    ],
    dueDate: '28/03/2025',
    prio: 'urgent',
    category: 'User Story',
    subtasks: [
      { id: 0, text: 'Create your app', done: true, focussed: false },
      { id: 1, text: 'Ask for feedback', done: false, focussed: false },
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
        id: 'tuUfjWZv2VAbUxJYSKgk',
        initials: 'AM',
        bgc: 'orange',
        name: 'Anton Mayer',
        email: 'anton.mayer@gmail.com',
        phone: '+49 1111 111 11 1',
      },
      {
        id: 'I4wQRBkO5rah9aWDxHhg',
        initials: 'AS',
        bgc: 'purple',
        name: 'Anja Schulz',
        email: 'anja.schulz@gmail.com',
        phone: '+49 2222 222 22 2',
      },
    ],
    dueDate: '18/03/2025',
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Animate logo', done: true, focussed: false },
      { id: 1, text: 'Animate dialogs', done: true, focussed: false },
      { id: 2, text: 'Animate back log', done: true, focussed: false },
    ],
    column: 'done',
  },
  {
    id: 'Rbk1LKDte4mA7oyKJoXh',
    title: 'Reactive Forms',
    description: 'Implement reactive forms by the Reactive Form Module.',
    assignedTo: [
      {
        id: 'Xt2PGmFqm7etX5xhJoGe',
        initials: 'BZ',
        bgc: 'blue',
        name: 'Benedikt Ziegler',
        email: 'benedikt.ziegler@gmail.com',
        phone: '+49 3333 333 33 3',
      },
      {
        id: '7MimBaQNd4cmekxpVGbi',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
    ],
    dueDate: '20/03/2025',
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Implement login form', done: true, focussed: false },
      { id: 1, text: 'Implement sign-up form', done: true, focussed: false },
      { id: 2, text: 'Implement add-task form', done: true, focussed: false },
      {
        id: 3,
        text: 'implement add-contact form',
        done: true,
        focussed: false,
      },
    ],
    column: 'done',
  },
  {
    id: 'OJSM2UnIXmjL5Uf6KvoN',
    title: 'Real-Time Data Exchange',
    description: 'Enable real-time data exchange by using Firestore Snapshots.',
    assignedTo: [
      {
        id: 'tQ0rTKIGUrcrCCjWDmYu',
        initials: 'EF',
        bgc: 'yellow',
        name: 'Eva Fischer',
        email: 'eva.fischer@gmail.com',
        phone: '+49 5555 555 55 5',
      },
      {
        id: 'IuPuSlnNvu7zcVQEHSQ3',
        initials: 'SM',
        bgc: 'cyan',
        name: 'Sofia Müller',
        email: 'sofia.mueller@gmail.com',
        phone: '+49 8888 888 88 8',
      },
    ],
    dueDate: '26/03/2025',
    prio: 'medium',
    category: 'Technical Task',
    subtasks: [
      { id: 0, text: 'Subscribe user collection', done: true, focussed: false },
      { id: 1, text: 'Subscribe user', done: true, focussed: false },
    ],
    column: 'await-feedback',
  },
  {
    id: 'OiVQS2rB17CgOrNhvnC9',
    title: 'Join Backend',
    description: 'Create your own Join Backend as Djange App.',
    assignedTo: [
      {
        id: 'Xt2PGmFqm7etX5xhJoGe',
        initials: 'BZ',
        bgc: 'blue',
        name: 'Benedikt Ziegler',
        email: 'benedikt.ziegler@gmail.com',
        phone: '+49 3333 333 33 3',
      },
      {
        id: 'Aoh2cKnEPVoOmfjYSn53',
        initials: 'DE',
        bgc: 'magenta',
        name: 'David Eisenberg',
        email: 'david.eisenberg@gmail.com',
        phone: '+49 4444 444 44 4',
      },
      {
        id: '7MimBaQNd4cmekxpVGbi',
        initials: 'EM',
        bgc: 'green',
        name: 'Emmanuel Mauer',
        email: 'emmanuel.mauer@gmail.com',
        phone: '+49 6666 666 66 6',
      },
    ],
    dueDate: '31/03/2025',
    prio: 'low',
    category: 'User Story',
    subtasks: [
      { id: 0, text: 'Create app', done: false, focussed: false },
      { id: 1, text: 'Ask for feedback', done: false, focussed: false },
    ],
    column: 'to-do',
  },
];

/**
 * Gets sample tasks from a sample task data array.
 * @returns The sample tasks.
 */
function getSampleTasks() {
  return SAMPLE_TASKS_DATA.map((taskData) => getTask(taskData));
}

/**
 * Gets a task from task data.
 * @param taskData - The task data.
 * @returns The task.
 */
function getTask(taskData: any) {
  return new Task(taskData);
}

export const sampleTasks = getSampleTasks();
