/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @param f
 * @usage
 * mockFunction(myAwesomeHelperFunction);
 */
export function mockFunction<T extends (...args: any[]) => any>(f: T): jest.Mock<ReturnType<T>> {
  return f as unknown as jest.Mock<ReturnType<T>>;
}
