import apolloClient from '~/lib/apolloClient';
import { countriesData } from '~/lib/map-box/locations/countries';
import { assertIsTrue } from '~/utils/value-checker-utils';
import { handleQueryResult, QueryRequestResult } from './helpers';
import { countryDetailsQuery } from './schemas/country-details.query';
import { CountryDetailsQueryResult, CountryDetailsQueryReturnData } from './types';

export const getCountryDetailsByCountryCode = async (): Promise<
  QueryRequestResult<CountryDetailsQueryReturnData>
> => {
  const countryDetailsPromises = countriesData.map((country) => {
    const { 'ISO Code': iso } = country;

    return apolloClient.query<CountryDetailsQueryResult>({
      query: countryDetailsQuery,
      variables: {
        query: iso
      }
    });
  });

  const results = await Promise.all(countryDetailsPromises);
  assertIsTrue(!!results);

  // Extract the data from each result filter out falsy results from array
  const data = results
    .map((result) => handleQueryResult(result, 'countryDetailsQuery').data)
    .filter(Boolean) as unknown as CountryDetailsQueryReturnData;

  return {
    data,
    errors: null,
    error: null,
    loading: data.length === 0
  };
};
