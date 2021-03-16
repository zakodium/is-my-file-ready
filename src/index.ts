import { CheckResult, CheckFunction } from './types';

/**
 *
 * @returns true - if my file is ready
 */
export default async function isMyFileReady(
  path: string,
  checks: CheckFunction[] | CheckFunction,
): Promise<{ isReady: boolean; checks: CheckResult[] }> {
  if (!Array.isArray(checks)) checks = [checks];
  const results = await Promise.all(checks.map((check) => check(path)));
  return {
    isReady: results.filter((result) => result.isReady === false).length === 0,
    checks: results,
  };
}

export * from './types';
export * from './checks';
