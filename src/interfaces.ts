export type CheckName =
  | 'editTime'
  | 'endsWithByteArray'
  | 'endsWithStr'
  | 'sameSize';

export interface CheckResult {
  checkName: CheckName;
  isReady: boolean;
}

export type CheckFunction<T> = (path: string) => Promise<T & CheckResult>;
