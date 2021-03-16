export type CheckName =
  | 'editTime'
  | 'endsWithByteArray'
  | 'endsWithStr'
  | 'sameSize';

interface EditTimeResult {
  name: 'editTime';
  lastEdit: Date;
}

interface EndsWithByteArrayResult {
  name: 'endsWithByteArray';
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
  | EndsWithByteArrayResult
  | EndsWithStrResult
  | SameSizeResult
);

export type CheckFunction = (path: string) => Promise<CheckResult>;
