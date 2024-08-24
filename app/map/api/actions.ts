import { cache } from 'react';
import { getCountryDetailsByCountryCode } from '~/graphql';

export const getMapData = cache(async () => {
  const response = getCountryDetailsByCountryCode();

  return response;
});
