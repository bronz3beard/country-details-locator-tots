'use client';

import { useEffect } from 'react';
import PageLoader from '~/components/loaders/page-loader';
import { mapConfig } from '~/components/map/constants';
import MapBox from '~/components/map/map-box';
import useInitialMap from '~/components/map/use-init-map';
import SidebarMenu from '~/components/sidebar-menu';
import { AppDrawers } from '~/context/drawer-context/types';
import Drawer from '~/design-system/drawer';
import { DrawerAnchor } from '~/design-system/drawer/types';
import Navbar from '~/design-system/navbar';
import { CountryDetailsQueryReturnData } from '~/graphql/schemas/countries-filter/types';
import useFeatureList from '~/hooks/use-map-features';

type ContainerProps<T> = {
  countries: CountryDetailsQueryReturnData | null;
  loading: boolean;
};

export default function MapPageContainer<T>({ countries, loading }: ContainerProps<T>) {
  const { mapBox, mapContainer } = useInitialMap(mapConfig);
  const { filterFeatures } = useFeatureList(mapBox);

  const handleFeatureClick = (code: string) => {
    filterFeatures(code);
    const countryDetails = countries?.find((item) => item.country.code === code);
    console.log('🚀 ~ handleFeatureClick ~ countryDetails:', countryDetails);
  };

  useEffect(
    function listenForMapIconClick() {
      if (mapBox) {
        mapBox.on('click', 'Countries', (event) => {
          console.log('🚀 ~ mapBox.on ~ event.features:', event.features?.[0]);
          filterFeatures(event.features?.[0].properties?.iso);
        });
      }
    },
    [mapBox, filterFeatures]
  );

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <Navbar mapBox={mapBox} />
      <Drawer
        width="w-80"
        anchor={DrawerAnchor.left}
        leftCloseLimit="md:-translate-x-64 -translate-x-80"
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
              data={countries}
              ref={drawerRef}
              showDrawer={showDrawer}
              handleOpenDrawer={handleDrawerOnOpen}
              handleCloseDrawer={handleDrawerOnClose}
              handleToggleDrawer={handleToggleDrawer}
              handleMenuItemClick={handleFeatureClick}
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
