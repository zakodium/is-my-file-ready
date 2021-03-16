import { open, stat } from 'fs/promises';

import { CheckFunction, CheckResult } from '../interfaces';

interface EndWithStrResult extends CheckResult {
  endsWith: string;
}

export function endsWithStr(endsStr: string): CheckFunction<EndWithStrResult> {
  if (typeof endsStr !== 'string') {
    throw new TypeError('endStr should be a string');
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
      endsWithStr: {
        isReady: endsWith === endsStr,
        endsWith,
      },
    };
  };
}
