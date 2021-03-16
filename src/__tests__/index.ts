import { readFile, stat } from 'fs/promises';

import isMyFileReady from '..';
import { endsWithStr } from '../checks/endsWithStr';
import { sameSize } from '../checks/sameSize';

const file = 'test-utils/lorem-ipsum.txt';
let size: number;
let end: string;

describe('test isMyFileReady', () => {
  beforeAll(async () => {
    size = (await stat(file)).size;
    end = (await readFile(file, { encoding: 'utf-8' })).slice(size - 5);
  });

  it('can pass one check', async () => {
    const result = await isMyFileReady(file, endsWithStr(end));
    expect(result).toStrictEqual({
      isReady: true,
      checks: {
        endsWithStr: {
          isReady: true,
          endsWith: end,
        },
      },
    });
  });

  it('can pass multiple checks', async () => {
    const result = await isMyFileReady(file, [
      endsWithStr(end),
      sameSize(size),
    ]);
    expect(result).toStrictEqual({
      isReady: true,
      checks: {
        endsWithStr: {
          isReady: true,
          endsWith: end,
        },
        sameSize: {
          isReady: true,
          size: size,
        },
      },
    });
  });
});
