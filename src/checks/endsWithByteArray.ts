import { open, stat } from 'fs/promises';

import { CheckFunction } from '../types';

export function endsWithByteArray(
  endByteArray: ArrayLike<number>,
): CheckFunction {
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
      name: 'endsWithByteArray',
      isReady: areEquals,
      endsWith: [...buffer.values()],
    };
  };
}
