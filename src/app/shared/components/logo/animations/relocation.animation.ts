import { Transform } from '../../../models/transform';

let name = 'relocation';

let propertiesA: { [key: string]: string | number } = {
  left: 'calc(calc(100% - 274px) / 2)',
  top: 'calc(calc(100vh - 335px) / 2)',
  width: '274px',
};

let propertiesB: { [key: string]: string | number } = {
  left: '77px',
  top: '80px',
  width: '100px',
};

export const relocation = new Transform(name, propertiesA, propertiesB);
