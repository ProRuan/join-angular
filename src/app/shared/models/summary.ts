export class Summary {
  toDo: number;
  done: number;
  urgent: number;
  deadline: any; // number, string or date?
  inBoard: number;
  inProgress: number;
  awaitFeedback: number;

  constructor() {
    this.toDo = 0;
    this.done = 0;
    this.urgent = 0;
    this.deadline = 'none';
    this.inBoard = 0;
    this.inProgress = 0;
    this.awaitFeedback = 0;
  }
}
