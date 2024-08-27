import { ReactNode, RefObject, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useEventListener from '~/hooks/use-event-listener';
import { ToolTipDirection } from './types';

type ToolTipProps = {
  text: string;
  children: ReactNode;
  direction?: ToolTipDirection;
  parentRef: RefObject<HTMLElement>;
};

const ToolTip = ({ direction = ToolTipDirection.TOP, text, children, parentRef }: ToolTipProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tooltipStyles, setTooltipStyles] = useState({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handlePopoverTrigger = () => {
    const textElement = tooltipRef.current;
    const parentElement = parentRef.current;

    if (!textElement || !parentElement) return;

    setIsOpen(true);

    const {
      top: parentTop,
      left: parentLeft,
      width: parentWidth,
      height: parentHeight,
      right: parentRight,
      bottom: parentBottom
    } = parentElement.getBoundingClientRect();
    const { height: tooltipHeight, width: tooltipWidth } = textElement.getBoundingClientRect();

    const positions = {
      [ToolTipDirection.TOP]: {
        top: parentTop - tooltipHeight - 8,
        left: parentLeft + parentWidth / 2 - tooltipWidth / 2
      },
      [ToolTipDirection.RIGHT]: {
        top: parentTop + parentHeight / 2 - tooltipHeight / 2 - 12,
        left: parentRight + 8
      },
      [ToolTipDirection.BOTTOM]: {
        top: parentBottom + 8,
        left: parentLeft + parentWidth / 2 - tooltipWidth / 2
      },
      [ToolTipDirection.LEFT]: {
        top: parentTop + parentHeight / 2 - tooltipHeight / 2,
        left: parentLeft - tooltipWidth - 8
      }
    };

    const { top, left } = positions[direction] || positions[ToolTipDirection.BOTTOM];

    setTooltipStyles({
      top: `${top}px`,
      left: `${left}px`,
      position: 'absolute',
      zIndex: 50
    });
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEventListener('mouseenter', handlePopoverTrigger, parentRef);
  useEventListener('mouseleave', handleMouseLeave, parentRef);

  const tooltipClass = {
    [ToolTipDirection.TOP]: {
      arrow: 'bottom-2/3 left-1/2 transform -translate-x-1/2 -rotate-180 mb-2'
    },
    [ToolTipDirection.RIGHT]: {
      arrow: 'right-full top-1/2 transform -translate-y-1/2 rotate-90 mr-0'
    },
    [ToolTipDirection.BOTTOM]: {
      arrow: 'top-2/3 left-1/2 transform -translate-x-1/2 rotate-0 mt-2'
    },
    [ToolTipDirection.LEFT]: {
      arrow: 'left-full top-1/2 transform -translate-y-1/2 -rotate-90 ml-0'
    }
  };

  const renderTooltip = () => (
    <div
      ref={tooltipRef}
      id="tooltip"
      role="tooltip"
      style={tooltipStyles}
      className={`z-50 ${isOpen ? '' : 'hidden'} fixed flex w-max items-center justify-start rounded bg-white px-2.5`}
    >
      <div className="relative flex items-center p-1 text-sm text-gray-500">{text}</div>
      <div
        id="arrow"
        className={`${isOpen ? '' : 'invisible'} ${tooltipClass[direction].arrow} absolute z-10 h-3 w-3 border-l-[5px] border-r-[5px] border-t-4 border-white border-l-transparent border-r-transparent`}
      ></div>
    </div>
  );

  return (
    <>
      {children}
      {createPortal(renderTooltip(), document?.body)}
    </>
  );
};

export default ToolTip;
