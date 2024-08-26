'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
import useDialog from '~/hooks/use-dialog';
import { Feature } from '~/hooks/use-map-features';
import useSearchQueryParam from '~/hooks/use-search-query-params';
import DebouncedInput from './debounce-input';
import { DialogPortal } from './dialog';

export default function SearchFilter({ featureList }: { featureList: Array<Feature> }) {
  const [isShowModalDelayed, setIsShowModalDelayed] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { handleDialogClose } = useDialog();
  const { searchFilter, handleSearchQueryParam, handleClearSearchQueryParam } =
    useSearchQueryParam();

  // showModal value without delay
  const showModalWithoutDelay = useMemo(
    () => featureList.length === 0 && !!searchFilter,
    [featureList, searchFilter]
  );

  // Use useEffect to add a 2-second delay after search query for "slower typing users"
  useEffect(
    function addDelayBeforeShowingDialog() {
      if (showModalWithoutDelay) {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
          setIsShowModalDelayed(true);
        }, 2000); // 2 seconds

        return () => {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
          }
        };
      } else {
        setIsShowModalDelayed(false);
      }
    },
    [showModalWithoutDelay]
  );

  const showModal = useMemo(
    () => featureList.length === 0 && !!searchFilter,
    [featureList, searchFilter]
  );

  const handleOnChange = useCallback(
    async (value: string) => {
      handleSearchQueryParam(value);
    },
    [handleSearchQueryParam]
  );

  const closeDialog = () => {
    handleDialogClose();
    handleClearSearchQueryParam();
    // if the search is clear stop timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
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
          onChange={handleOnChange}
          placeholder="Search Countries"
          ariaLabel="Country Search Filter"
          value={searchFilter || ''}
          className="w-full rounded-lg border border-neutral-100 bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-100 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-100"
        />

        <Button
          size="sm"
          variant="subtle"
          disabled={!searchFilter}
          onClick={() => handleClearSearchQueryParam()}
          className="absolute right-0 top-0 mr-3 flex h-full items-center"
        >
          <OutlineIcon name={!searchFilter ? 'search' : 'close'} className="h-4" />
        </Button>
      </div>

      <DialogPortal
        {...{
          showModal: isShowModalDelayed,
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
                &quot;{searchFilter}&quot; not Found.
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
