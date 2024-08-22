'use client';
import { useContext } from 'react';
import ContextDrawer, { DrawerContextProps } from '~/context/drawer-context';

const useDrawerContext = (): DrawerContextProps => {
  const ctx = useContext<DrawerContextProps>(ContextDrawer);

  if (!ctx) {
    throw new Error('useDrawerContext must be used within the ProviderDrawer');
  }

  return ctx;
};

export default useDrawerContext;
