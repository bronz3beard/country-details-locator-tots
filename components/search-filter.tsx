'use client';
import { useCallback, useMemo, useState } from 'react';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
import useDialog from '~/hooks/use-dialog';
import useFeatureList from '~/hooks/use-map-features';
import { MapBox } from '~/lib/map-box/types';
import DebouncedInput from './debounce-input';
import { DialogPortal } from './dialog';

export default function SearchFilter({ mapBox }: { mapBox: MapBox | null }) {
  const [searchFilter, setSearchFilter] = useState<string>('');

  const { handleDialogClose } = useDialog();
  const { featureList, filterFeatures } = useFeatureList(mapBox);

  const showModal = useMemo(
    () => featureList.length === 0 && !!searchFilter,
    [featureList, searchFilter]
  );

  const handleOnChange = useCallback(
    async (value: string) => {
      setSearchFilter(value);
      filterFeatures(value);
    },
    [filterFeatures]
  );

  const closeDialog = () => {
    handleDialogClose();
    setSearchFilter('');
  };

  return (
    <>
      <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <DebouncedInput
          required
          role="text"
          name="search"
          autoComplete="off"
          id="country-filter"
          value={searchFilter}
          onChange={handleOnChange}
          placeholder="Search Countries"
          ariaLabel="Country Search Filter"
          className="w-full rounded-lg border border-neutral-100 bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-100 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-100"
        />

        <Button
          size="sm"
          variant="subtle"
          disabled={!searchFilter}
          onClick={() => setSearchFilter('')}
          className="absolute right-0 top-0 mr-3 flex h-full items-center"
        >
          <OutlineIcon name={!searchFilter ? 'search' : 'close'} className="h-4" />
        </Button>
      </div>

      <DialogPortal
        {...{
          showModal,
          canCLose: true,
          isRelativeToParent: true,
          onClose: closeDialog,
          className:
            'mx-auto top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-full bg-black/25 z-50'
        }}
      >
        {() => {
          return (
            <div className="block max-w-sm px-6 pb-4">
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                That country has not been added.
              </h5>
              <p className="pt-4 font-normal text-gray-700 dark:text-gray-400">
                Please try searching for any of the countries you see on the left.
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Alternatively you can click on the sidebar options or the map pin icons on the map.
              </p>
            </div>
          );
        }}
      </DialogPortal>
    </>
  );
}
