import { endsWithByteArray } from '../endsWithByteArray';

const file = 'test-utils/lorem-ipsum.txt';
const okEnd = [
  103,
  101,
  114,
  32,
  101,
  117,
  32,
  97,
  110,
  116,
  101,
  32,
  110,
  105,
  115,
  105,
  46,
];
const notOkEnd = [42];
const invalidEnd = '42';

test("returns the expected result if file doesn't end with the expected string", async () => {
  expect(await endsWithByteArray(notOkEnd)(file)).toStrictEqual({
    checkName: 'endsWithByteArray',
    isReady: false,
    endsWith: okEnd.slice(okEnd.length - notOkEnd.length),
  });
});

test('returns the expected result if file does end with the expected string', async () => {
  expect(await endsWithByteArray(okEnd)(file)).toStrictEqual({
    checkName: 'endsWithByteArray',
    isReady: true,
    endsWith: okEnd,
  });
});

test('throws error if input is not an array of byte', async () => {
  const t = async () => {
    await endsWithByteArray((invalidEnd as unknown) as ArrayLike<number>)(file);
  };
  await expect(t).rejects.toBeInstanceOf(TypeError);
});
