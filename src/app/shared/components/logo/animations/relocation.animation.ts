import { Properties } from '../../../interfaces/properties';
import { Transform } from '../../../models/transform';

let name = 'relocation';

let properties: Properties = {
  start: {
    left: 'calc(calc(100% - 274px) / 2)',
    top: 'calc(calc(100vh - 335px) / 2)',
    width: '274px',
  },
  end: {
    left: '77px',
    top: '80px',
    width: '100px',
  },
};

export const relocation = new Transform(name, properties);
