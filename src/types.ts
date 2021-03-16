export type CheckName =
  | 'editTime'
  | 'endsWithBytes'
  | 'endsWithStr'
  | 'sameSize';

interface EditTimeResult {
  name: 'editTime';
  lastEdit: Date;
}

interface EndsWithBytesResult {
  name: 'endsWithBytes';
  endsWith: ArrayLike<number>;
}

interface EndsWithStrResult {
  name: 'endsWithStr';
  endsWith: string;
}

interface SameSizeResult {
  name: 'sameSize';
  size: number;
}

export type CheckResult = { isReady: boolean } & (
  | EditTimeResult
  | EndsWithBytesResult
  | EndsWithStrResult
  | SameSizeResult
);

export type CheckFunction = (path: string) => Promise<CheckResult>;
