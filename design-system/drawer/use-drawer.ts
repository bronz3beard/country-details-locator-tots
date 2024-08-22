import { RefObject, useEffect, useRef, useState } from 'react';
import { getDrawerState } from '~/context/drawer-context/helpers';
import { AppDrawers, DrawerValues } from '~/context/drawer-context/types';

export type UseDrawer = {
  drawerRef: RefObject<HTMLDivElement> | null;
  drawerCloseButtonRef: RefObject<HTMLButtonElement> | null;
  showDrawer: DrawerValues;
  handleOpenDrawer: (drawer: AppDrawers) => void;
  handleCloseDrawer: (drawer: AppDrawers) => void;
};

const useDrawer = () => {
  const initialState = getDrawerState(true);
  const [showDrawer, setShowDrawer] = useState<DrawerValues>(initialState);

  const ref = useRef<HTMLDivElement>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenDrawer = (drawer: AppDrawers) => {
    setShowDrawer((prevState) => ({ ...prevState, [drawer]: true }));
  };

  const handleCloseDrawer = (drawer: AppDrawers) => {
    setShowDrawer((prevState) => ({ ...prevState, [drawer]: false }));
  };

  useEffect(() => {
    setShowDrawer((prevState) => ({ ...prevState, [AppDrawers.MAP_SIDEBAR]: true }));
  }, []);

  return {
    drawerRef: ref,
    drawerCloseButtonRef,
    showDrawer,
    handleOpenDrawer,
    handleCloseDrawer
  };
};

export default useDrawer;
