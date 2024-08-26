import React from 'react';

const mockSetState = jest.fn();
type State = Record<string, any>;

/**
 * Mock implementation of React's useState hook.
 * @param {Record<string, any>} mockValues - An object with initial state values.
 * @returns {jest.SpyInstance} - A Jest spy instance for useState.
 * @usage
 */
export const mockUseState = (mockValues: State) => {
  const state = { ...mockValues };
  return jest.spyOn(React, 'useState').mockImplementation(() => [state, mockSetState]);
};
