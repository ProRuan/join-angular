/**
 * Represents a generic model.
 */
export interface Model<T> {
  new (item: T): { getObject: () => T };
}
