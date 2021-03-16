import { endsWithStr } from '../endsWithStr';

const file = 'test-utils/lorem-ipsum.txt';
const okEnd = 'ger eu ante nisi.';
const notOkEnd = 'pog oh onch yike.';
const invalidEnd = 42;

describe('test endsWithStr', () => {
  it("returns the expected result if file doesn't end with the expected string", async () => {
    expect(await endsWithStr(notOkEnd)(file)).toStrictEqual({
      endsWithStr: {
        isReady: false,
        endsWith: okEnd,
      },
    });
  });

  it('returns the expected result if file does end with the expected string', async () => {
    expect(await endsWithStr(okEnd)(file)).toStrictEqual({
      endsWithStr: {
        isReady: true,
        endsWith: okEnd,
      },
    });
  });

  it('throws error if input is not a string', async () => {
    const t = async () => {
      await endsWithStr((invalidEnd as unknown) as string)(file);
    };
    await expect(t).rejects.toBeInstanceOf(TypeError);
  });
});
