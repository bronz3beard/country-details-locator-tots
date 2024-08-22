import { MouseEvent, ReactNode, RefObject, forwardRef } from 'react';
import { AppDrawers } from '~/context/drawer-context/types';
import useDrawerContext from '~/hooks/use-drawer-context';
import { isFunction } from '~/utils/value-checker-utils';
import { DrawerAnchor } from './types';

type DrawerChildProps = {
  drawerRef: RefObject<HTMLDivElement> | null;
  showDrawer: boolean;
  handleDrawerOnOpen: () => void;
  handleDrawerOnClose: () => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
};

type DrawerProps = {
  anchor: DrawerAnchor;
  children: ReactNode | ((props: DrawerChildProps) => ReactNode);
  width?: string;
  leftCloseLimit?: string;
  rightCloseLimit?: string;
  drawer: AppDrawers;
};

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      drawer,
      anchor,
      children,
      width,
      leftCloseLimit = '-translate-x-full',
      rightCloseLimit = 'translate-x-full',
      ...rest
    }: DrawerProps,
    ref
  ) => {
    const { drawerRef, showDrawer, handleOpenDrawer, handleCloseDrawer } = useDrawerContext();

    const handleDrawerOnClose = () => handleCloseDrawer(drawer);
    const handleDrawerOnOpen = () => handleOpenDrawer(drawer);

    const handleToggleDrawer = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (showDrawer[drawer]) {
        handleDrawerOnClose();
      } else {
        handleDrawerOnOpen();
      }
    };

    return (
      <div
        ref={ref}
        className={`duration-900 fixed bottom-0 z-50 flex h-[calc(100vh-54px)] flex-1 flex-col content-center bg-white transition ease-in-out ${width || 'w-full md:w-2/3 lg:w-1/3'} ${
          DrawerAnchor[anchor] === 'left'
            ? `left-0 ${showDrawer[drawer] ? 'translate-x-0' : leftCloseLimit}`
            : `right-0 ${showDrawer[drawer] ? 'translate-x-0' : rightCloseLimit}`
        }`}
      >
        <div className="flex h-full min-h-0 w-full flex-col">
          <div className="flex h-full w-full flex-1 items-start">
            <nav className="flex h-full flex-1 flex-col">
              {isFunction(children)
                ? children({
                    ...rest,
                    drawerRef,
                    showDrawer: showDrawer[drawer],
                    handleDrawerOnOpen,
                    handleDrawerOnClose,
                    handleToggleDrawer
                  })
                : children}
            </nav>
          </div>
        </div>
      </div>
    );
  }
);
Drawer.displayName = 'Drawer';

export default Drawer;
