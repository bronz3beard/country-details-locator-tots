export function assertIsTrue(condition: boolean, errorMessage?: string): asserts condition {
  if (!condition) {
    throw new Error(errorMessage ?? 'Assertion failed');
  }
}
