'use client';

import { useEffect, useState } from 'react';
import ConditionalWrapper from '~/components/conditional-wrapper';
import { DialogPortal } from '~/components/dialog';
import PageLoader from '~/components/loaders/page-loader';
import { mapConfig } from '~/components/map/constants';
import MapBox from '~/components/map/map-box';
import useInitialMap from '~/components/map/use-init-map';
import SidebarMenu from '~/components/sidebar-menu';
import { AppDrawers } from '~/context/drawer-context/types';
import Button from '~/design-system/button';
import Drawer from '~/design-system/drawer';
import { DrawerAnchor } from '~/design-system/drawer/types';
import Navbar from '~/design-system/navbar';
import {
  CountryDetails,
  CountryDetailsQueryReturnData
} from '~/graphql/schemas/countries-filter/types';
import useDialog from '~/hooks/use-dialog';
import useFeatureList from '~/hooks/use-map-features';

type ContainerProps<T> = {
  countries: CountryDetailsQueryReturnData | null;
  loading: boolean;
};

export default function MapPageContainer<T>({ countries, loading }: ContainerProps<T>) {
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
  console.log('🚀 ~ countryDetails:', countryDetails);

  const { mapBox, mapContainer } = useInitialMap(mapConfig);
  const { filterFeatures } = useFeatureList(mapBox);
  const { openDialog, handleOpenDialog, handleDialogClose } = useDialog();

  const handleFeatureClick = (code: string) => {
    filterFeatures(code);

    const countryDetails = countries?.find((item) => item.country.code === code);
    setCountryDetails(countryDetails ?? null);

    handleOpenDialog();
  };

  useEffect(
    function listenForMapIconClick() {
      if (mapBox) {
        mapBox.on('click', 'Countries', (event) => {
          const code = event.features?.[0].properties?.iso;

          filterFeatures(code);

          const countryDetails = countries?.find((item) => item.country.code === code);
          setCountryDetails(countryDetails ?? null);

          handleOpenDialog();
        });
      }
    },
    [mapBox, countries, filterFeatures, handleOpenDialog]
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
      <DialogPortal
        {...{
          handleDecline: handleDialogClose,
          isRelativeToParent: true,
          showModal: openDialog,
          className: 'md:!w-1/3 !w-1/2 lg:right-12 right-1/4 top-1/4'
        }}
      >
        {({ onDecline }) => {
          return (
            <div className="relative max-h-full w-full max-w-3xl">
              {/* <!-- Modal content --> */}
              <div className="relative select-none rounded-lg bg-white shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}

                <ConditionalWrapper conditional={countryDetails}>
                  {({ value: { country } }) => {
                    return (
                      <div className="flex w-full flex-col items-start justify-between px-4 pt-4 md:px-5 md:pt-5">
                        <div className="flex w-full flex-col items-start justify-between">
                          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {country.name}
                          </h1>

                          <div>
                            <h2 className="mb-2 text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">
                              Capital City: {country.capital}
                            </h2>
                          </div>
                        </div>

                        <div className="space-y-2 p-4 md:p-5">
                          <h2 className="mb-2 text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">
                            Languages
                          </h2>
                          <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
                            {country.languages.map(({ name }, index) => (
                              <li key={index}>{name}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex w-full items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            text="Close"
                            id="DECLINED"
                            variant="grow"
                            onClick={onDecline}
                          />
                        </div>
                      </div>
                    );
                  }}
                </ConditionalWrapper>
              </div>
            </div>
          );
        }}
      </DialogPortal>
    </>
  );
}
