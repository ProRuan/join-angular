import { Properties } from '../../../interfaces/properties';
import { Transform } from '../../../models/transform';

let name = 'revelation';

let properties: Properties = {
  start: {
    backgroundColor: '#f6f7f8',
  },
  end: {
    backgroundColor: 'transparent',
  },
};

export const revelation = new Transform(name, properties);
