'use client';

import PageLoader from '~/components/loaders/page-loader';
import { mapConfig } from '~/components/map/constants';
import MapBox from '~/components/map/map-box';
import useInitialMap from '~/components/map/use-init-map';
import SidebarMenu from '~/components/sidebar-menu';
import { AppDrawers } from '~/context/drawer-context/types';
import Drawer from '~/design-system/drawer';
import { DrawerAnchor } from '~/design-system/drawer/types';
import Navbar from '~/design-system/navbar';

type ContainerProps<T> = {
  data: Array<T> | null;
  loading: boolean;
};

export default function MapPageContainer<T>({ data, loading }: ContainerProps<T>) {
  const { mapBox, mapContainer } = useInitialMap(mapConfig);

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <Navbar mapBox={mapBox} />
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
              data={data}
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
          <MapBox mapContainer={mapContainer} />
        </div>
      </div>
    </>
  );
}
