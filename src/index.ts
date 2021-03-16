import { CheckResult, CheckFunction } from './interfaces';

/**
 *
 * @returns true - if my file is ready
 */
export default async function isMyFileReady(
  path: string,
  checks: CheckFunction<CheckResult>[] | CheckFunction<CheckResult>,
): Promise<{ isReady: boolean; checks: { [key: string]: CheckResult } }> {
  if (!Array.isArray(checks)) checks = [checks];
  const results = await Promise.all(checks.map((check) => check(path)));
  const resultObj: { [key: string]: CheckResult } = {};
  results.forEach((result) => {
    const key = Object.keys(result)[0];
    resultObj[key] = result[key];
  });
  return {
    isReady:
      Object.values(resultObj).filter((result) => result.isReady === false)
        .length === 0,
    checks: resultObj,
  };
}
