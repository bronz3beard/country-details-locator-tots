import dynamic from 'next/dynamic';
import { MouseEvent } from 'react';
import OutlineIcon from '~/design-system/icons/outline';
import { CountryDetails, CountryDetailsQueryReturnData } from '~/graphql/types';
import MenuItem from '../menu-item';
const MenuItemExpandable = dynamic(() => import('../menu-item-expandable'), { ssr: false });

export function isCountriesTypeGuard(data: any): data is CountryDetailsQueryReturnData {
  return Array.isArray(data) && data.every((item) => 'country' in item);
}

const CountryMenuItems = ({
  countries,
  showDrawer,
  handleToggleDrawer,
  handleMenuItemClick
}: {
  showDrawer: boolean;
  handleMenuItemClick: (code: string) => void;
  countries: CountryDetailsQueryReturnData | null;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const handleOnItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id } = event.currentTarget;

    handleMenuItemClick(id);
  };

  return (
    <MenuItemExpandable
      title="Countries"
      showDrawer={showDrawer}
      handleToggleDrawer={handleToggleDrawer}
      icon={<OutlineIcon name="map-pin-alt" className="text-gray-100" size={25} />}
    >
      {countries?.map((item: CountryDetails | null, index) => {
        if (item?.country) {
          const { code, emoji, name } = item.country;

          return (
            <MenuItem
              id={code}
              key={index}
              className="my-2"
              label={name}
              showDrawer={showDrawer}
              icon={
                <span role="img" aria-label="flag">
                  {`${emoji}`}
                </span>
              }
              handleClick={handleOnItemClick}
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
