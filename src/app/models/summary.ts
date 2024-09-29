export class Summary {
  toDo: number;
  done: number;
  urgent: number;
  deadline: any; // number, string or date?
  inBoard: number;
  inProgress: number;
  awaitFeedback: number;

  // add optional parameter!!!
  // set default!!!
  constructor() {
    this.toDo = 1;
    this.done = 1;
    this.urgent = 1;
    this.deadline = 'October 16, 2022';
    this.inBoard = 5;
    this.inProgress = 2;
    this.awaitFeedback = 2;
  }

  formatDeadline() {}
}
