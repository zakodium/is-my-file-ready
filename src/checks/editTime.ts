import { stat } from 'fs/promises';

import { CheckFunction, CheckResult } from '../interfaces';

interface EditTimeResult extends CheckResult {
  lastEdit: Date;
}

export function editTime(
  referenceTime: Date | number,
): CheckFunction<EditTimeResult> {
  if (typeof referenceTime !== 'number' && typeof referenceTime !== 'object') {
    throw new TypeError('referenceTime should either be a Date or a number');
  }
  return async (path: string) => {
    const { mtime } = await stat(path);
    return {
      editTime: {
        isReady: sameDate(mtime, referenceTime),
        lastEdit: mtime,
      },
    };
  };
}

function sameDate(a: Date | number, b: Date | number) {
  if (typeof a !== 'number') {
    a = a.getTime();
  }
  if (typeof b !== 'number') {
    b = b.getTime();
  }
  return a === b;
}
