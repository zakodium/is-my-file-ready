import { sameSize } from '../sameSize';

const file = 'test-utils/lorem-ipsum.txt';
const okSize = 2742;
const notOkSize = 42;
const invalidSizes = [42.2, '42'];

test('returns the expected result if file has not the expected size', async () => {
  expect(await sameSize(notOkSize)(file)).toStrictEqual({
    sameSize: {
      isReady: false,
      size: okSize,
    },
  });
});

test('returns the expected result if file has the expected size', async () => {
  expect(await sameSize(2742)(file)).toStrictEqual({
    sameSize: {
      isReady: true,
      size: 2742,
    },
  });
});

test('throws error if input is not an integer', async () => {
  const t = async () => {
    await sameSize(invalidSizes[0] as number)(file);
  };
  await expect(t).rejects.toBeInstanceOf(TypeError);
});

test('throws error if input is not a number', async () => {
  const t = async () => {
    await sameSize(invalidSizes[1] as number)(file);
  };
  await expect(t).rejects.toBeInstanceOf(TypeError);
});
