/**
 * Represents a model.
 */
export interface Model<T> {
  new (item: T): T;
}
