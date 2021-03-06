import { stat } from 'fs/promises';

import { editTime } from '../editTime';

const file = 'test-utils/lorem-ipsum.txt';
let okTime: Date;
const notOkTime = new Date();
const invalidTime = '42';

beforeAll(async () => {
  okTime = (await stat(file)).mtime;
});

test('returns the expected result if the last modification is different than the specified time (date)', async () => {
  expect(await editTime(notOkTime)(file)).toStrictEqual({
    name: 'editTime',
    isReady: false,
    lastEdit: okTime,
  });
});

test('returns the expected result if the last modification is different than the specified time (ms)', async () => {
  expect(await editTime(notOkTime.getTime())(file)).toStrictEqual({
    name: 'editTime',
    isReady: false,
    lastEdit: okTime,
  });
});

test('returns the expected result if the last modification is the same as the specified one (date)', async () => {
  expect(await editTime(okTime)(file)).toStrictEqual({
    name: 'editTime',
    isReady: true,
    lastEdit: okTime,
  });
});

test('returns the expected result if the last modification is the same as the specified one (ms)', async () => {
  expect(await editTime(okTime.getTime())(file)).toStrictEqual({
    name: 'editTime',
    isReady: true,
    lastEdit: okTime,
  });
});

test('throws error if input is neither a date or a number', async () => {
  const t = async () => {
    // @ts-expect-error
    await editTime(invalidTime)(file);
  };
  await expect(t).rejects.toThrow(
    'referenceTime should either be a Date or a number',
  );
});
