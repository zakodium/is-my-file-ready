import { open, stat } from 'fs/promises';

import { CheckFunction, CheckResult } from '../interfaces';

interface EndsWithByteArrayResult extends CheckResult {
  endsWith: ArrayLike<number>;
}

export function endsWithByteArray(
  endByteArray: ArrayLike<number>,
): CheckFunction<EndsWithByteArrayResult> {
  if (!Array.isArray(endByteArray)) {
    throw new TypeError('endByteArray should be an array');
  }
  return async (path: string) => {
    const { size } = await stat(path);

    const endsWithLength = endByteArray.length;

    const fileHandle = await open(path, 'r');
    const { buffer } = await fileHandle.read(
      Buffer.alloc(endsWithLength),
      0,
      endsWithLength,
      size - endsWithLength,
    );
    await fileHandle.close();

    let areEquals = true;
    for (let i = 0; i < endsWithLength; i++) {
      if (buffer[i] !== endByteArray[i]) {
        areEquals = false;
        break;
      }
    }

    return {
      checkName: 'endsWithByteArray',
      isReady: areEquals,
      endsWith: [...buffer.values()],
    };
  };
}
