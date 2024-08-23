import Badge from '~/design-system/badge';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
// import OutlineIcon from '~/design-system/icons/outline';

type MenuHeaderProps = {
  showDrawer: boolean;
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
};

const MenuHeader = ({ showDrawer, handleCloseDrawer, handleOpenDrawer }: MenuHeaderProps) => {
  return (
    <div className="flex h-9 w-full items-center justify-start rounded-lg px-2">
      <div className="flex h-6 shrink grow basis-0 items-start justify-center gap-3">
        <div className="select-none text-center text-lg font-medium leading-normal text-gray-900">
          {/* {showDrawer ? 'Country Explorer' : null} */}
          <Button
            size="sm"
            type="button"
            variant="grow"
            onClick={showDrawer ? handleCloseDrawer : handleOpenDrawer}
            className="absolute right-0 top-3 z-20 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700"
          >
            <Badge
              className={`absolute -right-3 top-0 h-6 w-6 rounded-full bg-slate-600 px-0 py-0`}
            >
              {showDrawer ? (
                <OutlineIcon name="arrow-left" size={24} />
              ) : (
                <OutlineIcon name="arrow-right" size={24} />
              )}
            </Badge>
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
