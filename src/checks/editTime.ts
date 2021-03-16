import { stat } from 'fs/promises';

import { CheckFunction } from '../types';

export function editTime(referenceTime: Date | number): CheckFunction {
  if (typeof referenceTime !== 'number' && typeof referenceTime !== 'object') {
    throw new TypeError('referenceTime should either be a Date or a number');
  }
  return async (path: string) => {
    const { mtime } = await stat(path);
    return {
      name: 'editTime',
      isReady: sameDate(mtime, referenceTime),
      lastEdit: mtime,
    };
  };
}

function sameDate(a: Date, b: Date | number) {
  if (typeof b !== 'number') {
    b = b.getTime();
  }
  return a.getTime() === b;
}
