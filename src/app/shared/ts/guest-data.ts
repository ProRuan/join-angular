import { sampleContactsData } from './sample-contacts-data';
import { getDeadline, sampleTasksData } from './sample-tasks-data';

const GUEST_DATA = {
  id: 'l3o4VwUX3iIzxDz4kdbR',
  initials: 'G',
  name: 'Guest',
  email: 'guest@sample.com',
  phone: '+49 6789 345 12 0',
  password: 'Guest12!',
  summary: {
    toDo: { category: 'To-do', amount: 1 },
    done: { category: 'Done', amount: 2 },
    urgent: { category: 'Urgent', amount: 1, deadline: getDeadline() },
    inBoard: { category: 'Tasks In Board', amount: 5 },
    inProgress: { category: 'Tasks In Progress', amount: 1 },
    awaitingFeedback: { category: 'Awaiting Feedback', amount: 1 },
  },
  tasks: [...sampleTasksData],
  contacts: [...sampleContactsData],
};

export const guestData = GUEST_DATA;
