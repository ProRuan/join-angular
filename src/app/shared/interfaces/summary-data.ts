import { SummaryTaskData } from './summary-task-data';

/**
 * Interface representing summary data.
 */
export interface SummaryData {
  [key: string]: SummaryTaskData;
  toDo: SummaryTaskData;
  done: SummaryTaskData;
  urgent: SummaryTaskData;
  inBoard: SummaryTaskData;
  inProgress: SummaryTaskData;
  awaitingFeedback: SummaryTaskData;
}
