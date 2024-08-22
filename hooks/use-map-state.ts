'use client';
import { useContext } from 'react';
import { ContextMap } from '~/context/map-provider';

const useMapState = () => {
  const ctx = useContext(ContextMap);

  if (!ctx) {
    throw new Error('useMapState must be used within the ProviderMap');
  }

  return ctx;
};

export default useMapState;
