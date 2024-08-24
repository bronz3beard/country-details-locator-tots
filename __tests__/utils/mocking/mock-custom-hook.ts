/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';

type MockCustomHookArgs = {
  useCustomHook: any;
  ComponentWrapper?: any;
  args?: any[];
};
/**
 *
 * @param param0
 * @usage
 * const { result } = mockCustomHook({ useCustomHook: useMyCustomHookName });
 * expect(result.current.[value]).toBe(some primitive value);
 */
export const mockCustomHook = ({
  useCustomHook,
  ComponentWrapper,
  args = []
}: MockCustomHookArgs) => {
  const { result, rerender } = renderHook(() => useCustomHook(...args), {
    wrapper: ComponentWrapper
  });

  return {
    result,
    rerender
  };
};
