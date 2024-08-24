import React from 'react';

const mockEffectCleanup = jest.fn();
/**
 * @usage mockUseEffect();
 */
export const mockUseEffect = () => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((effect) => {
    effect(); // Invoke the effect immediately
    return mockEffectCleanup; // Return the cleanup function
  });
};
