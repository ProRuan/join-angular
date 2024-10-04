import { Transform } from '../../../models/transform';

let name = 'revelation';

let propertiesA: { [key: string]: string | number } = {
  backgroundColor: '#f6f7f8',
};

let propertiesB: { [key: string]: string | number } = {
  backgroundColor: 'transparent',
};

export const revelation = new Transform(name, propertiesA, propertiesB);
