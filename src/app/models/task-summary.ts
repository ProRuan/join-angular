export class TaskSummary {
  toDo: number;
  done: number;
  urgent: number;
  deadline: any; // to change!!!
  inBoard: number;
  inProgress: number;
  awaitingFeedback: number;

  constructor() {
    this.toDo = 0;
    this.done = 0;
    this.urgent = 0;
    this.deadline = 0;
    this.inBoard = 0;
    this.inProgress = 0;
    this.awaitingFeedback = 0;
  }
}
