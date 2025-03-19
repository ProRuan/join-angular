import { Properties } from '../../../interfaces/properties';
import { Transform } from '../../../models/transform';

const name: string = 'revelation';

const properties: Properties = {
  start: {
    backgroundColor: '#f6f7f8',
  },
  end: {
    backgroundColor: 'transparent',
  },
};

const timings: string = '500ms 200ms ease-in-out';

export const revelation = new Transform(name, properties, timings);
