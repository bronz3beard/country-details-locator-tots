import { cache } from 'react';
import apolloClient from '~/lib/apolloClient';
import { countriesData } from '~/lib/map-box/locations/countries';
import { assertIsTrue } from '~/utils/value-checker-utils';
import { handleQueryResult, QueryRequestResult } from './helpers';
import { countryCodeFilterQuery } from './schemas/countries-filter/country-code-query';
import { countryNameFilterQuery } from './schemas/countries-filter/country-name-query';
import {
  CountriesFilterQueryResult,
  CountriesFilterQueryReturnData,
  CountryDetailsQueryResult,
  CountryDetailsQueryReturnData,
  QueryVariables
} from './schemas/countries-filter/types';
import { countryDetailsQuery } from './schemas/country-details.query';

export const searchCountries = cache(
  async ({
    query
  }: QueryVariables): Promise<QueryRequestResult<CountriesFilterQueryReturnData>> => {
    const [codeQueryResult, nameQueryResult] = await Promise.all([
      apolloClient.query<CountriesFilterQueryResult>({
        query: countryCodeFilterQuery,
        variables: { query }
      }),
      apolloClient.query<CountriesFilterQueryResult>({
        query: countryNameFilterQuery,
        variables: { query: `.*${query}.*` } // Example regex to match names containing the query
      })
    ]);

    const codeResult = handleQueryResult(codeQueryResult, 'countryCodeFilterQuery');
    const nameResult = handleQueryResult(nameQueryResult, 'countryNameFilterQuery');
    const codeNodes = codeResult.data?.countries?.nodes ?? [];
    const nameNodes = nameResult.data?.countries?.nodes ?? [];

    // Combine results and use a Set to ensure uniqueness based on `code`
    const combinedResults = [...codeNodes, ...nameNodes];

    const uniqueResults = Array.from(
      new Map(combinedResults.map((item) => [item.code, item])).values()
    );

    return {
      data: uniqueResults,
      errors: codeResult.errors || nameResult.errors,
      error: codeResult.error || nameResult.error,
      loading: codeResult.loading || nameResult.loading
    };
  }
);

export const getCountryDetailsByCountryCode = cache(
  async (): Promise<QueryRequestResult<CountryDetailsQueryReturnData>> => {
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
  }
);
