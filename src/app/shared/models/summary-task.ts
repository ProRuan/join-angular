/**
 * Represents a summary task.
 */
export class SummaryTask {
  amount: number;
  category: string;
  deadline?: string;

  /**
   * Creates a summary task.
   * @param category - The task category.
   * @param deadline - The task deadline.
   */
  constructor(category: string, deadline?: string) {
    this.amount = 0;
    this.category = category;
    if (deadline) {
      this.deadline = deadline;
    }
  }
}
