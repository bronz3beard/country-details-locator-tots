'use client';
import { Children, ReactElement, ReactNode, cloneElement, createContext, useMemo } from 'react';
import useDrawer, { UseDrawer } from '~/design-system/drawer/use-drawer';

export interface DrawerContextProps extends UseDrawer {}

export const ContextDrawer = createContext<DrawerContextProps>({
  drawerRef: null,
  drawerCloseButtonRef: null,
  showDrawer: {},
  handleOpenDrawer: () => {
    return;
  },
  handleCloseDrawer: () => {
    return;
  }
});

export const ProviderDrawer = ContextDrawer.Provider;

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const { drawerRef, showDrawer, drawerCloseButtonRef, handleOpenDrawer, handleCloseDrawer } =
    useDrawer();

  const drawerApi: UseDrawer = useMemo(
    () => ({
      drawerRef,
      showDrawer,
      drawerCloseButtonRef,
      handleOpenDrawer,
      handleCloseDrawer
    }),
    [drawerRef, showDrawer, drawerCloseButtonRef, handleOpenDrawer, handleCloseDrawer]
  );

  return (
    <ProviderDrawer value={drawerApi}>
      {Children.count(children) > 1
        ? Children.map(children, (child) => cloneElement(child as unknown as ReactElement))
        : children}
    </ProviderDrawer>
  );
};

export default ContextDrawer;
