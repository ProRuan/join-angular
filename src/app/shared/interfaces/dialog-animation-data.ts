/**
 * Interface representing dialog animation data.
 */
export interface DialogAnimationData {
  parent: ParentAnimationData;
  children?: ChildAnimationData[];
}

/**
 * Interface representing parent animation data.
 */
export interface ParentAnimationData {
  state: string;
  timings: string;
  properties: {
    start: PropertyData[];
    end: PropertyData[];
  };
}

/**
 * Interface representing property data.
 */
export interface PropertyData {
  [key: string]: string | number;
}

/**
 * Interface representing child animation data.
 */
export interface ChildAnimationData {
  selector: string;
  timings: string;
  properties: {
    start: PropertyData[];
    end: PropertyData[];
  };
  options: { optional: boolean };
}
