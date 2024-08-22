import Link from 'next/link';
// import OutlineIcon from '~/design-system/icons/outline';
// import ToolTip from '~/design-system/tool-tip';
// import { ToolTipDirection } from '~/design-system/tool-tip/types';

const MenuFooter = ({ showDrawer }: { showDrawer: boolean }) => {
  return (
    <div className="flex w-80 flex-col items-center py-4">
      <hr className="my-4 h-px w-full rounded border-0 bg-transparent" />
      <div
        className={`gap-3" inline-flex h-6 w-full items-center justify-center ${showDrawer ? 'justify-start pl-4' : 'justify-end px-2 align-middle'}`}
      >
        <Link
          href="/"
          className={`disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 flex w-full items-center ${showDrawer ? 'w-full grow justify-start' : 'w-24 justify-end pr-3.5'} gap-2 rounded-md border-0 bg-transparent py-3 text-center text-base font-medium leading-4 hover:underline`}
        >
          {/* {showDrawer ? (
            <OutlineIcon name="home" size={25} className="text-gray-700" />
          ) : (
            <ToolTip text="Home" direction={ToolTipDirection.RIGHT}>
              <OutlineIcon name="home" size={25} className="text-gray-700" />
            </ToolTip>
          )} */}
          {showDrawer ? (
            <div className="text-base font-medium leading-normal text-gray-700">Home</div>
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default MenuFooter;
