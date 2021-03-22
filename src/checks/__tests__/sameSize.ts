import { stat } from 'fs/promises';

import { sameSize } from '../sameSize';

const file = 'test-utils/lorem-ipsum.txt';
let okSize: number;
let notOkSize: number;
const invalidSizes = [42.2, '42'];

beforeAll(async () => {
  okSize = (await stat(file)).size;
  notOkSize = okSize - 1;
});

test('returns the expected result if file has not the expected size', async () => {
  expect(await sameSize(notOkSize)(file)).toStrictEqual({
    name: 'sameSize',
    isReady: false,
    size: okSize,
  });
});

test('returns the expected result if file has the expected size', async () => {
  expect(await sameSize(okSize)(file)).toStrictEqual({
    name: 'sameSize',
    isReady: true,
    size: okSize,
  });
});

test('throws error if input is not an integer', async () => {
  const t = async () => {
    // @ts-expect-error
    await sameSize(invalidSizes[0])(file);
  };
  await expect(t).rejects.toThrow('expectedSize should be an integer');
});

test('throws error if input is not a number', async () => {
  const t = async () => {
    // @ts-expect-error
    await sameSize(invalidSizes[1])(file);
  };
  await expect(t).rejects.toThrow('expectedSize should be a number');
});
