import { open, stat } from 'fs/promises';

import { CheckFunction } from '../types';

export function endsWithStr(endsStr: string): CheckFunction {
  if (typeof endsStr !== 'string' || endsStr.length === 0) {
    throw new TypeError('endStr should be a non-empty string');
  }
  return async (path: string) => {
    const { size } = await stat(path);

    const endsWithLength = Buffer.from(endsStr).byteLength;

    const fileHandle = await open(path, 'r');
    const { buffer } = await fileHandle.read(
      Buffer.alloc(endsWithLength),
      0,
      endsWithLength,
      size - endsWithLength,
    );
    await fileHandle.close();

    const endsWith = buffer.toString('utf-8');

    return {
      name: 'endsWithStr',
      isReady: endsWith === endsStr,
      endsWith,
    };
  };
}
