import { open, stat } from 'fs/promises';

import { CheckFunction } from '../types';

export function endsWithBytes(endBytes: ArrayLike<number>): CheckFunction {
  if (!Array.isArray(endBytes)) {
    throw new TypeError('endBytes should be an array');
  }
  return async (path: string) => {
    const { size } = await stat(path);

    const endsWithLength = endBytes.length;

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
      if (buffer[i] !== endBytes[i]) {
        areEquals = false;
        break;
      }
    }

    return {
      name: 'endsWithBytes',
      isReady: areEquals,
      endsWith: [...buffer.values()],
    };
  };
}
