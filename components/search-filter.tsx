'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
import useFeatureList from '~/hooks/use-map-features';
import { MapBox } from '~/lib/map-box/types';
import DebouncedInput from './debounce-input';

export default function SearchFilter({ mapBox }: { mapBox: MapBox | null }) {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [searchFilter, setSearchFilter] = useState<string>(searchParams.toString());

  const { filterFeatures } = useFeatureList(mapBox);

  const handleOnChange = useCallback(
    async (value: string) => {
      setSearchFilter(value);
      filterFeatures(value);
      // const newParams = new URLSearchParams(searchParams.toString());

      // if (search.value) {
      //   newParams.set('q', search.value);
      // } else {
      //   newParams.delete('q');
      // }

      // router.push(createUrl('/', newParams));
    },
    [filterFeatures]
  );

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <DebouncedInput
        required
        role="text"
        name="search"
        autoComplete="off"
        id="country-filter"
        value={searchFilter}
        onChange={handleOnChange}
        key={searchParams?.get('q')}
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
  );
}
