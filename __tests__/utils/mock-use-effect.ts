import React from 'react';

export const mockUseEffect = () => {
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
};
