'use client';
import { MouseEvent, ReactNode, useState } from 'react';
import Button from '~/design-system/button';
// import OutlineIcon from '~/design-system/icons/outline';
// import ToolTip from '~/design-system/tool-tip';
// import { ToolTipDirection } from '~/design-system/tool-tip/types';

type MenuItemExpandableProps = {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  nestedExpandable?: boolean;
  showDrawer: boolean;
  handleToggleDrawer: (event: MouseEvent<HTMLButtonElement>) => void;
};

const MenuItemExpandable = ({
  children,
  title,
  icon,
  nestedExpandable,
  showDrawer,
  handleToggleDrawer
}: MenuItemExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    // Retrieve the initial expanded state from local storage
    const STORAGE_KEY = title.toLowerCase().replace(' ', '-');
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : false;
  });
  console.log('🚀 ~ isExpanded:', isExpanded);
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const STORAGE_KEY = title.toLowerCase().replace(' ', '-');

    setIsExpanded((prevIsExpanded) => {
      const newIsExpanded = !prevIsExpanded;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIsExpanded));
      return newIsExpanded;
    });

    // only toggle when the icon is clicked if the drawer is not expanded
    if (!showDrawer) {
      handleToggleDrawer(event);
    }

    // if the drawer is closed but the menu item is already expanded leave the menu item expanded and open the drawer
    if (!showDrawer && isExpanded) {
      setIsExpanded(() => {
        const newIsExpanded = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newIsExpanded));
        return newIsExpanded;
      });
    }
  };

  return (
    <li className="relative mx-auto h-screen w-full">
      <Button
        size="auto"
        variant="subtle"
        onClick={handleOnClick}
        className={`${nestedExpandable ? 'pl-0' : 'pl-0'} relative flex h-min w-full ${showDrawer ? '' : 'justify-end px-2 align-middle'} text-lg font-medium duration-200`}
      >
        <div
          className={`${isExpanded ? 'h-9 bg-gray-400 text-gray-100' : 'h-9 text-gray-100 hover:text-white'} ${showDrawer ? 'w-full grow justify-start' : 'w-24 justify-end pr-6'} flex shrink basis-0 items-center gap-3 rounded-lg px-2`}
        >
          {/* {showDrawer ? (
            icon
          ) : (
            <ToolTip text={title} direction={ToolTipDirection.RIGHT}>
              {icon}
            </ToolTip>
          )} */}
          {showDrawer && title ? (
            <div className="text-base font-medium leading-normal text-gray-100 hover:text-white">
              {title}
            </div>
          ) : null}
        </div>
        {showDrawer ? (
          <span className={`${isExpanded ? 'rotate-0' : 'rotate-180'} select-none text-gray-100`}>
            {/* <OutlineIcon name="chevron-down" /> */}
            {'v'}
          </span>
        ) : null}
      </Button>
      <div className={`${isExpanded ? 'block' : 'hidden'}`}>
        <ul className="w-full pl-8">{children}</ul>
      </div>
    </li>
  );
};

export default MenuItemExpandable;
