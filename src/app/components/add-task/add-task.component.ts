import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinService } from '../../shared/services/join.service';

// verify!!!
import { PrioButtonComponent } from '../../shared/components/prio-button/prio-button.component';
import { PrioService } from '../../shared/services/prio.service';
import { last } from 'rxjs';
import { AssignedToService } from '../../shared/services/assigned-to.service';
import { CategoryService } from '../../shared/services/category.service';
import { SubtaskService } from '../../shared/services/subtask.service';
// import { User } from '../../shared/models/user';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, PrioButtonComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  join: JoinService = inject(JoinService);
  prioData: PrioService = inject(PrioService);

  // verify + rename!!!
  asToData: AssignedToService = inject(AssignedToService);
  catData: CategoryService = inject(CategoryService);
  subTData: SubtaskService = inject(SubtaskService);
  sessionToken: string = '';
  codes: string[] = [];

  // verify + rename
  task: any;
  ACListViewed: boolean = true;
  filter: string = '';
  dueDate: any;
  currDate: string = new Date().toLocaleDateString();
  dateInvalid: boolean = false;
  dueDatePat = /([0-3]?[0-9])[\.\/]([0-1]?[0-9])[\.\/]([0-9]{4})/;
  subtask: string = '';
  subtaskFocused: boolean = false;

  assignableContacts = [
    {
      initials: 'SM',
      name: 'Sofia Müller',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'AS',
      name: 'Anja Schulz',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'EF',
      name: 'Eva Fischer',
      assigned: false,
      filtered: true,
    },
  ];
  assignedContacts: any;

  // subtasks = [
  //   {
  //     text: 'Contact Form',
  //     done: false,
  //     focused: false,
  //   },
  //   {
  //     text: 'Write Legal Imprint',
  //     done: false,
  //     focused: false,
  //   },
  // ];

  // Please review!!!

  // title - check
  // description - check
  // assignedTo - check
  //   - logged in user 'You' ... (!)
  //   - subId ... ?
  // dueDate - check
  // prio - check
  // category - check
  // subtasks ...

  constructor() {
    this.task = {
      title: '',
      description: '',
      assignedTo: [],
      dueDate: '',
      prio: 'medium',
      category: '',
      subtasks: [],
      column: 'to-do',
    };
  }

  // get user() {
  //   return this.join.user;
  // }

  // async ngOnInit() {
  //   console.log('got user via join service: ', this.join.user);
  //   if (!this.user.tasks) {
  //     this.user.tasks = [];
  //   }
  //   this.formatCurrDate();
  // }

  switchAssignedTo() {
    if (!this.asToData.opened) {
      this.asToData.set(true);
    } else {
      this.asToData.set(false);
    }
  }

  closeAssignedTo() {
    this.asToData.set(false);
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  logFocus() {
    this.asToData.set(true);
  }

  updateArrowAssignedTo() {
    if (this.asToData.opened) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  // possible on keydown?!
  filterAC() {
    this.assignableContacts.forEach((contact) => {
      if (contact.name.includes(this.filter)) {
        contact.filtered = true;
        // console.log('filtered ac: ', contact);
      } else {
        contact.filtered = false;
        // console.log('hidden ac: ', contact);
      }
    });
  }

  getCheckbox(i: number) {
    return this.assignableContacts[i].assigned ? 'checked' : 'check';
  }

  getSrc(i: number) {
    if (this.assignableContacts[i].assigned) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  assign(i: number) {
    this.assignableContacts[i].assigned = !this.assignableContacts[i].assigned
      ? true
      : false;
    console.log('assignable contacts: ', this.assignableContacts);

    let contacts = this.assignableContacts.filter(
      (contact) => contact.assigned
    );
    if (contacts) {
      this.assignedContacts = contacts;
    }
    console.log('assigned contacts: ', this.assignedContacts);
  }

  formatCurrDate() {
    // date validation
    let date = new Date('2023/10/32');
    console.log('date to validate: ', date);

    this.currDate = this.currDate.replaceAll('.', '/');
    let [day, month, year] = this.currDate.split('/');
    if (day.length < 2) {
      day = '0' + day;
    }
    if (month.length < 2) {
      month = '0' + month;
    }
    this.currDate = day + '/' + month + '/' + year;
    console.log('new Date: ', this.currDate);
  }

  // to improve!!!
  updateCalender() {
    let dateCompleted = this.task.dueDate.match(this.dueDatePat);
    if (dateCompleted) {
      console.log('due date pattern: ', dateCompleted);
      let day = dateCompleted[1];
      let d = day;
      if (day.length == 1) {
        day = '0' + day;
      }
      let month = dateCompleted[2];
      let m = month;
      if (month.length == 1) {
        month = '0' + month;
      }
      let year = dateCompleted[3];
      let y = year;
      this.task.dueDate = `${day}/${month}/${year}`;
      this.dueDate = `${year}-${month}-${day}`;
      console.log('got task due date by pattern: ', this.task.dueDate);
      console.log('got due date by pattern: ', this.dueDate);

      let dateInput = `${parseInt(d)}.${parseInt(m)}.${y}`;
      let validDate = new Date(`${y}/${m}/${d}`);
      let dateMatch = dateInput == validDate.toLocaleDateString();
      if (validDate) {
        console.log('date input: ', dateInput);
        console.log('date validation: ', validDate.toLocaleDateString());
        console.log('date match: ', dateMatch);
      }
    }
  }

  showHint() {
    return this.dateInvalid ? 'o-1' : '';
  }

  formatDueDate() {
    let [year, month, day] = this.dueDate.split('-');
    this.task.dueDate = day + '/' + month + '/' + year;
    // console.log('new due date: ', this.task.dueDate);
  }

  // double code!!!
  switchCategory() {
    if (!this.catData.opened) {
      this.catData.set(true);
    } else {
      this.catData.set(false);
    }
  }

  // double code!!!
  updateArrowCategory() {
    if (this.catData.opened) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  setCategory(element: HTMLDivElement) {
    this.task.category = element.innerText;
    this.catData.set(false);
  }

  resetForm(ngForm: NgForm) {
    ngForm.reset();
    this.prioData.reset();
  }

  // add task to user!!!
  async addTask(ngForm: NgForm) {
    // if (ngForm.form.valid) {
    //   this.task.assignedTo = this.assignedContacts;
    //   this.task.prio = this.prioData.prio;
    //   this.task.subtasks = this.subTData.subtasks;
    //   if (this.user.id) {
    //     await this.join.updateUserProperty('tasks', JSON.stringify(this.task));
    //     console.log('task created: ', this.task);
    //   }
    //   // check error!!!
    //   // if (this.user.id) {
    //   //   let temp = await this.userData.getUser(this.user.id);
    //   //   console.log('tasks updated: ', JSON.parse(temp.tasks));
    //   // }
    // } else {
    //   console.log('not valid');
    // }
  }
}
