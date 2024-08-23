'use client';
import { MouseEvent, ReactNode, useRef, useState } from 'react';
import Button from '~/design-system/button';
import ToolTip from '~/design-system/tool-tip';
import { ToolTipDirection } from '~/design-system/tool-tip/types';
import { cn } from '~/utils/style.utils';

const MenuItem = ({
  id,
  label,
  handleClick,
  icon,
  suffix,
  className,
  showDrawer
}: {
  id?: string | undefined;
  label: string;
  showDrawer: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  suffix?: ReactNode;
  className?: string;
}) => {
  const [itemSelect, setItemSelect] = useState<boolean>(false);
  const toolTipRef = useRef<HTMLDivElement>(null);

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    setItemSelect((id ?? label).includes(id));
    handleClick(event);
  };

  return (
    <li className={cn('flex h-min w-full flex-col items-start justify-start gap-4', className)}>
      <Button
        id={id ?? label}
        size="auto"
        variant="grow"
        onClick={handleOnClick}
        className={`relative flex h-min w-full ${showDrawer ? '' : 'justify-end px-2 align-middle'} text-lg font-medium duration-200`}
      >
        <div
          ref={toolTipRef}
          className={`${showDrawer ? 'w-full grow justify-start' : 'w-24 justify-end pr-6'} ${itemSelect ? 'text-blue-500' : 'text-gray-100 hover:text-white'} flex shrink basis-0 items-center gap-3 rounded-lg px-2`}
        >
          {showDrawer ? (
            icon
          ) : (
            <ToolTip parentRef={toolTipRef} text={label} direction={ToolTipDirection.RIGHT}>
              {icon}
            </ToolTip>
          )}
          {showDrawer ? <div className="text-base font-medium leading-normal">{label}</div> : null}
        </div>
        {suffix ? (
          <span
            className={`select-none ${itemSelect ? 'text-blue-500' : 'text-gray-100 hover:text-white'}`}
          >
            {suffix}
          </span>
        ) : null}
      </Button>
    </li>
  );
};

export default MenuItem;
