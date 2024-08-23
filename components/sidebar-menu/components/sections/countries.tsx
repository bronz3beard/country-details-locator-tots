import dynamic from 'next/dynamic';
import { MouseEvent } from 'react';
// import SolidIcon from '~/design-system/icons/solid';
import OutlineIcon from '~/design-system/icons/outline';
import {
  CountryDetails,
  CountryDetailsQueryReturnData
} from '~/graphql/schemas/countries-filter/types';
import MenuItem from '../menu-item';
const MenuItemExpandable = dynamic(() => import('../menu-item-expandable'), { ssr: false });

export function isCountriesTypeGuard(data: any): data is CountryDetailsQueryReturnData {
  return Array.isArray(data) && data.every((item) => 'country' in item);
}

const CountryMenuItems = ({
  countries,
  showDrawer,
  // handleMenuItemFeatureClick,
  handleToggleDrawer
}: {
  countries: CountryDetailsQueryReturnData | null;
  showDrawer: boolean;
  // handleMenuItemFeatureClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <MenuItemExpandable
      title="Countries"
      showDrawer={showDrawer}
      handleToggleDrawer={handleToggleDrawer}
      icon={<OutlineIcon name="map-pin-alt" className="text-gray-100" size={25} />}
    >
      {countries?.map((item: CountryDetails | null, index) => {
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
