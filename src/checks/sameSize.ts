import { stat } from 'fs/promises';

import { CheckFunction, CheckResult } from '../interfaces';

interface SameSizeResult extends CheckResult {
  size: number;
}

export function sameSize(expectedSize: number): CheckFunction<SameSizeResult> {
  if (typeof expectedSize !== 'number') {
    throw new TypeError(`expectedSize should be a number`);
  }
  if (Number.isInteger(expectedSize) === false) {
    throw new TypeError(`expectedSize should be an integer`);
  }

  return async (path: string) => {
    const { size } = await stat(path);
    return {
      sameSize: {
        isReady: expectedSize === size,
        size,
      },
    };
  };
}
