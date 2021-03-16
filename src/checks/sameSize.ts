import { stat } from 'fs/promises';

import { CheckFunction } from '../types';

export function sameSize(expectedSize: number): CheckFunction {
  if (typeof expectedSize !== 'number') {
    throw new TypeError(`expectedSize should be a number`);
  }
  if (Number.isInteger(expectedSize) === false) {
    throw new TypeError(`expectedSize should be an integer`);
  }

  return async (path: string) => {
    const { size } = await stat(path);
    return {
      name: 'sameSize',
      isReady: expectedSize === size,
      size,
    };
  };
}
