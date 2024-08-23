import { MouseEvent } from 'react';
import CountryMenuItems, { isCountriesTypeGuard } from './sections/countries';

const MenuBody = <T,>({
  data,
  showDrawer,
  handleMenuItemClick,
  handleToggleDrawer
}: {
  data: Array<T> | null;
  showDrawer: boolean;
  handleMenuItemClick: (code: string) => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <ul className="no-scrollbar flex h-full flex-1 flex-col items-center justify-start gap-4 self-stretch overflow-y-scroll">
      <CountryMenuItems
        showDrawer={showDrawer}
        handleToggleDrawer={handleToggleDrawer}
        handleMenuItemClick={handleMenuItemClick}
        countries={isCountriesTypeGuard(data) ? data : null}
      />
    </ul>
  );
};

export default MenuBody;
