export interface Summary {
  toDo: number;
  done: number;
  urgent: number;
  deadline: any; // number, string or date?
  inBoard: number;
  inProgress: number;
  awaitFeedback: number;
}
