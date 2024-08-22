'use client';
import MapBox from '~/components/map/map-box';
import SidebarMenu from '~/components/sidebar-menu';
import { AppDrawers } from '~/context/drawer-context/types';
import Drawer from '~/design-system/drawer';
import { DrawerAnchor } from '~/design-system/drawer/types';
import useMapState from '~/hooks/use-map-state';

export default function HomePage() {
  const { mapContainer } = useMapState();

  return (
    <>
      <Drawer
        width="w-80"
        anchor={DrawerAnchor.left}
        leftCloseLimit="-translate-x-64"
        drawer={AppDrawers.MAP_SIDEBAR}
      >
        {({
          drawerRef,
          showDrawer,
          handleDrawerOnOpen,
          handleDrawerOnClose,
          handleToggleDrawer
        }) => {
          return (
            <SidebarMenu
              ref={drawerRef}
              showDrawer={showDrawer}
              handleOpenDrawer={handleDrawerOnOpen}
              handleCloseDrawer={handleDrawerOnClose}
              handleToggleDrawer={handleToggleDrawer}
            />
          );
        }}
      </Drawer>

      <div className="flex h-[calc(100vh-54px)] w-screen overflow-hidden bg-gray-100/50 bg-white bg-clip-border text-gray-700">
        <div className="h-full w-full">
          {mapContainer ? <MapBox mapContainer={mapContainer} /> : null}
        </div>
      </div>
    </>
  );
}
