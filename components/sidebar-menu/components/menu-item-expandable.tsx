'use client';
import { MouseEvent, ReactNode, useRef, useState } from 'react';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
import ToolTip from '~/design-system/tool-tip';
import { ToolTipDirection } from '~/design-system/tool-tip/types';

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
  const toolTipRef = useRef<HTMLDivElement>(null);

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
        className={`relative flex h-min w-full px-2 text-lg font-medium duration-200 ${showDrawer ? '' : 'justify-end align-middle'}`}
      >
        <div
          ref={toolTipRef}
          className={`px-2 ${showDrawer ? 'w-full grow justify-between' : 'mr-2 justify-end align-middle'} ${isExpanded ? 'h-9 bg-gray-600 text-gray-100' : 'h-9 text-gray-100 hover:text-white'} flex shrink basis-0 items-center gap-3 rounded-lg`}
        >
          <span className="flex w-max justify-center gap-2">
            {showDrawer ? (
              icon
            ) : (
              <ToolTip parentRef={toolTipRef} text={title} direction={ToolTipDirection.RIGHT}>
                {icon}
              </ToolTip>
            )}
            {showDrawer && title ? (
              <div className="text-base font-medium leading-normal text-gray-100 hover:text-white">
                {title}
              </div>
            ) : null}
          </span>
          {showDrawer ? (
            <span className={`${isExpanded ? 'rotate-0' : 'rotate-180'} select-none text-gray-100`}>
              <OutlineIcon name="chevron-down" />
            </span>
          ) : null}
        </div>
      </Button>
      <div className={`${isExpanded ? 'block' : 'hidden'}`}>
        <ul className="w-full pl-8">{children}</ul>
      </div>
    </li>
  );
};

export default MenuItemExpandable;
