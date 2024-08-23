import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { createUrl } from '~/utils/url-utils';

const useSearchQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFilter = searchParams?.get('q');

  const handleSearchQueryParam = useCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/', newParams));
  }, []);

  const handleClearSearchQueryParam = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('q');
    router.push(createUrl('/', newParams));
  }, []);

  return { searchFilter, handleSearchQueryParam, handleClearSearchQueryParam };
};

export default useSearchQueryParam;
