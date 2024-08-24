/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const mockSetState = jest.fn();

/**
 * Mock implementation of React's useState hook.
 * @param {Record<string, any>} mockValues - An object with initial state values.
 * @returns {jest.SpyInstance} - A Jest spy instance for useState.
 * @usage
 * ```typescript
 * const mockValues = { count: 0 };
 * const mockUseStateSpy = mockUseState(mockValues);
 *
 * // Component that uses useState
 * function Counter() {
 *   const [state, setState] = useState({ count: 0 });
 *   return (
 *     <div>
 *       <p>{state.count}</p>
 *       <button onClick={() => setState({ count: state.count + 1 })}>Increment</button>
 *     </div>
 *   );
 * }
 *
 * // Test
 * render(<Counter />);
 * expect(screen.getByText('0')).toBeInTheDocument();
 * fireEvent.click(screen.getByText('Increment'));
 * expect(mockSetState).toHaveBeenCalledWith({ count: 1 });
 * ```
 */
export const mockUseState = (mockValues: Record<string, any>) => {
  const state = { ...mockValues };
  return jest.spyOn(React, 'useState').mockImplementation(() => [state, mockSetState]);
};
