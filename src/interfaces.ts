export interface CheckResult {
  isReady: boolean;
}

export type CheckFunction<T extends CheckResult> = (
  path: string,
) => Promise<{ [key: string]: T }>;
