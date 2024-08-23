import { useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '~/utils/url-utils';

const useSearchQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFilter = searchParams?.get('q');

  const handleSearchQueryParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/', newParams));
  };

  const handleClearSearchQueryParam = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('q');
    router.push(createUrl('/', newParams));
  };

  return { searchFilter, handleSearchQueryParam, handleClearSearchQueryParam };
};

export default useSearchQueryParam;
