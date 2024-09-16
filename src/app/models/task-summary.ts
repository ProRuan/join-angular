export class TaskSummary {
  toDo: number;
  done: number;
  urgent: number;
  deadline: any; // to change!!!
  inBoard: number;
  inProgress: number;
  awaitingFeedback: number;

  // set default!!!
  constructor() {
    this.toDo = 1;
    this.done = 1;
    this.urgent = 1;
    this.deadline = 'October 16, 2022';
    this.inBoard = 5;
    this.inProgress = 2;
    this.awaitingFeedback = 2;
  }
}
