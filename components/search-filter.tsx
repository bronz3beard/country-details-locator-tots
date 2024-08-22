'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getCountryDetailsByCountryCode } from '~/graphql';
import useFeatureList from '~/hooks/use-map-features';
import DebouncedInput from './debounce-input';

export default function SearchFilter() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [searchFilter, setSearchFilter] = useState<string>(searchParams.toString());

  const { inputFeatureFilter } = useFeatureList();

  async function handleOnChange(value: string) {
    if (value) {
      const response = await getCountryDetailsByCountryCode({ query: value });
    }

    // const newParams = new URLSearchParams(searchParams.toString());

    // if (search.value) {
    //   newParams.set('q', search.value);
    // } else {
    //   newParams.delete('q');
    // }

    // router.push(createUrl('/', newParams));
    setSearchFilter(value);
    inputFeatureFilter(value);
  }

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <DebouncedInput
        required
        role="text"
        name="search"
        autoComplete="off"
        id="country-filter"
        placeholder="Search Countries"
        ariaLabel="Country Search Filter"
        key={searchParams?.get('q')}
        onChange={handleOnChange}
        value={searchFilter}
        className="w-full rounded-lg border border-neutral-100 bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-100 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-100"
      />

      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        {/* <MagnifyingGlassIcon className="h-4" /> */}
      </div>
    </div>
  );
}
