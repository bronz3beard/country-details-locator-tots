import apolloClient from '~/lib/apolloClient';
import { assertIsTrue } from '~/utils/value-checker-utils';
import { handleQueryResult } from './helpers';
import { countryCodeFilterQuery } from './schemas/countries-filter/country-code-query';
import { countryNameFilterQuery } from './schemas/countries-filter/country-name-query';
import {
  CountriesFilterQuery,
  CountriesFilterQueryVariables
} from './schemas/countries-filter/types';
import { countryDetailsQuery } from './schemas/country-details.query';

export async function searchCountries({ query }: CountriesFilterQueryVariables) {
  const [codeQueryResult, nameQueryResult] = await Promise.all([
    apolloClient.query<CountriesFilterQuery>({
      query: countryCodeFilterQuery,
      variables: { query }
    }),
    apolloClient.query<CountriesFilterQuery>({
      query: countryNameFilterQuery,
      variables: { query: `.*${query}.*` } // Example regex to match names containing the query
    })
  ]);
  const codeResult = handleQueryResult(codeQueryResult);
  const nameResult = handleQueryResult(nameQueryResult);
  const codeNodes = codeResult.data?.countries?.nodes ?? [];
  const nameNodes = nameResult.data?.countries?.nodes ?? [];

  // Combine results and use a Set to ensure uniqueness based on `code`
  const combinedResults = [...codeNodes, ...nameNodes];

  const uniqueResults = Array.from(new Map(combinedResults.map((c) => [c.code, c])).values());

  return uniqueResults;
}

export async function getCountryDetailsByCountryCode({ query }: CountriesFilterQueryVariables) {
  const result = await apolloClient.query<CountriesFilterQuery>({
    query: countryDetailsQuery,
    variables: {
      query // or "United States"
    }
  });
  assertIsTrue(!!result);

  console.log('🚀 ~ getCountryDetailsByCountryCode ~ result:', result);
  return handleQueryResult(result);
}
