import { MouseEvent } from 'react';
import CountryMenuItems from './sections/countries';

const MenuBody = ({
  showDrawer,
  // handleMenuItemFeatureClick,
  handleToggleDrawer
}: {
  showDrawer: boolean;
  // handleMenuItemFeatureClick: <T>(
  //   event: MouseEvent<HTMLButtonElement>,
  //   features?: Array<T>
  // ) => void;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <ul className="no-scrollbar flex h-full flex-1 flex-col items-center justify-start gap-4 self-stretch overflow-y-scroll">
      <CountryMenuItems
        showDrawer={showDrawer}
        handleToggleDrawer={handleToggleDrawer}
        // handleMenuItemFeatureClick={handleMenuItemFeatureClick}
      />
    </ul>
  );
};

export default MenuBody;
