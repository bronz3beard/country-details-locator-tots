import { MouseEvent, ReactElement, Ref, forwardRef } from 'react';
import MenuBody from './components/menu-body';
import MenuFooter from './components/menu-footer';
import MenuHeader from './components/menu-header';

type SideBarProps<T> = {
  data: Array<T> | null;
  showDrawer: boolean;
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
  // handleMenuItemFeatureClick: <T>(
  //   event: MouseEvent<HTMLButtonElement>,
  //   features?: Array<T>
  // ) => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Sidebar = <T,>(
  {
    data,
    showDrawer,
    handleCloseDrawer,
    handleOpenDrawer,
    // handleMenuItemFeatureClick,
    handleToggleDrawer
  }: SideBarProps<T>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className="relative z-10 flex w-full flex-1 flex-col items-start justify-between bg-gray-900"
    >
      <div
        className={`shadow-b-2 shadow-r-3 -shadow-spread-2 flex h-min w-80 flex-1 flex-col items-start justify-start gap-2 bg-transparent ${showDrawer ? 'px-3' : 'ml-3.5'}`}
      >
        <MenuHeader
          showDrawer={showDrawer}
          handleCloseDrawer={handleCloseDrawer}
          handleOpenDrawer={handleOpenDrawer}
        />

        <MenuBody
          data={data}
          showDrawer={showDrawer}
          handleToggleDrawer={handleToggleDrawer}
          // handleMenuItemFeatureClick={handleMenuItemFeatureClick}
        />
      </div>
      <MenuFooter showDrawer={showDrawer} />
    </div>
  );
};

// Cast the output
const SidebarMenu = forwardRef(Sidebar) as unknown as <T>(
  p: SideBarProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

export default SidebarMenu;
