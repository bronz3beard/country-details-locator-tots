export function assertIsTrue(condition: boolean, errorMessage?: string): asserts condition {
  if (!condition) {
    throw new Error(errorMessage ?? 'Assertion failed');
  }
}

export const isFunction = <T extends (...args: any[]) => any = (...args: any[]) => any>(
  func: unknown
): func is T => {
  return func != null && typeof func === 'function';
};
