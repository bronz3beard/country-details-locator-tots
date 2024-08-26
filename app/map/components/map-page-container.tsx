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
import Drawer from '~/design-system/drawer';
import { DrawerAnchor } from '~/design-system/drawer/types';
import Navbar from '~/design-system/navbar';
import { CountryDetails, CountryDetailsQueryReturnData } from '~/graphql/types';
import useDialog from '~/hooks/use-dialog';
import useFeatureList from '~/hooks/use-map-features';
import useSearchQueryParam from '~/hooks/use-search-query-params';
import { normalizeString } from '~/utils/string-utils';
import DetailsCard from './details-card';

type ContainerProps<T> = {
  countries: CountryDetailsQueryReturnData | null;
  loading: boolean;
};

export default function MapPageContainer<T>({ countries, loading }: ContainerProps<T>) {
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);

  const { mapBox, mapContainer } = useInitialMap(mapConfig);
  const { featureList, filterFeatures } = useFeatureList(mapBox);
  const { openDialog, handleOpenDialog, handleDialogClose } = useDialog();
  const { searchFilter, handleClearSearchQueryParam } = useSearchQueryParam();

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

          if (code) {
            filterFeatures(code);

            const countryDetails = countries?.find((item) => item.country.code === code);
            setCountryDetails(countryDetails ?? null);

            handleOpenDialog();
          }
        });
      }
    },
    [mapBox, countries, filterFeatures, handleOpenDialog]
  );

  const closeDialog = () => {
    filterFeatures('');
    handleDialogClose();
    handleClearSearchQueryParam();
  };

  useEffect(
    function updateMapFeaturesAndDialogBasedOnSearchInput() {
      if (!searchFilter) {
        handleDialogClose();
        handleClearSearchQueryParam();
      }

      if (searchFilter) {
        const countryData = countries?.find(
          (item) =>
            item.country.states.some(
              (item) => normalizeString(item.name) === normalizeString(searchFilter)
            ) ||
            item.country.subdivisions.some(
              (item) => normalizeString(item.name) === normalizeString(searchFilter)
            )
        );

        filterFeatures(countryData ? countryData.country.code : searchFilter);
      }
    },
    [countries, searchFilter, filterFeatures, handleDialogClose, handleClearSearchQueryParam]
  );

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <Navbar featureList={featureList} />
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
          onClose: closeDialog,
          showModal: openDialog,
          isRelativeToParent: true,
          className: 'mx-auto top-8 flex justify-end md:top-24 md:right-24 right-0 w-auto px-0.5'
        }}
      >
        {() => {
          return (
            <ConditionalWrapper conditional={countryDetails}>
              {({ value }) => {
                return (
                  <DetailsCard
                    name={value.country.name}
                    states={value.country.states}
                    flag={`${value.country.emoji}`}
                    capital={value.country.capital}
                    currency={value.country.currency}
                    languages={value.country.languages}
                    continent={value.country.continent.name}
                    subdivisions={value.country.subdivisions}
                  />
                );
              }}
            </ConditionalWrapper>
          );
        }}
      </DialogPortal>
    </>
  );
}
