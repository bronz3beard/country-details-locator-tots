import dynamic from 'next/dynamic';
import { MouseEvent, useEffect, useState } from 'react';
// import SolidIcon from '~/design-system/icons/solid';
import { getCountryDetailsByCountryCode } from '~/graphql';
import { CountryDetails } from '~/graphql/schemas/countries-filter/types';
import { countriesData } from '~/lib/map-box/locations/countries';
import MenuItem from '../menu-item';
const MenuItemExpandable = dynamic(() => import('../menu-item-expandable'), { ssr: false });

const CountryMenuItems = ({
  showDrawer,
  // handleMenuItemFeatureClick,
  handleToggleDrawer
}: {
  showDrawer: boolean;
  // handleMenuItemFeatureClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [countries, setCountries] = useState<Array<CountryDetails | null>>([]);

  useEffect(function getCountryDetailsData() {
    const fetchData = async () => {
      // Create an array of promises using country codes from static data
      const countryDetailsPromises = countriesData.map(async (country) => {
        const { 'ISO Code': iso } = country;
        const countryData = await getCountryDetailsByCountryCode({ query: iso });

        const countryDetails: CountryDetails | null =
          (countryData.data as unknown as CountryDetails) ?? null;

        return countryDetails;
      });
      const fetchedCountries = await Promise.all(countryDetailsPromises);

      setCountries(fetchedCountries ?? []);
    };

    fetchData();
  }, []);

  return (
    <MenuItemExpandable
      title="Countries"
      showDrawer={showDrawer}
      handleToggleDrawer={handleToggleDrawer}
      // icon={<SolidIcon name="tailwind" className="text-gray-700" size={25} />}
    >
      {[...countries, ...countries, ...countries]?.map((item: CountryDetails | null, index) => {
        if (item?.country) {
          const {
            awsRegion,
            capital,
            code,
            continent,
            currencies,
            currency,
            emoji,
            emojiU,
            // languages: {
            //   name,
            //   native,
            // }[];
            name,
            native,
            phone,
            phones,
            // states: {
            //   name,
            //   code,
            // }[];
            subdivisions
          } = item.country;

          return (
            <MenuItem
              key={index}
              className="my-2"
              label={name}
              showDrawer={showDrawer}
              icon={
                <span role="img" aria-label="flag">
                  {`${emoji}`}
                </span>
              }
              // handleClick={handleMenuItemFeatureClick}
            />
          );
        } else {
          return null;
        }
      })}
    </MenuItemExpandable>
  );
};

export default CountryMenuItems;
