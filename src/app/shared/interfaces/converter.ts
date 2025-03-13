/**
 * Interface representing a converter.
 */
export interface Converter<T> {
  new (item: T): { getObject: () => T };
}
