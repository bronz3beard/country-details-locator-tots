import { ApolloQueryResult } from '@apollo/client';
import apolloClient from '~/lib/apolloClient';
import { assertIsTrue } from '~/utils/value-checker-utils';
import { countryCodeFilterQuery } from './schemas/countries-filter/country-code-query';
import {
  CountriesFilterQuery,
  CountriesFilterQueryVariables
} from './schemas/countries-filter/types';

function handleQueryResult<T>(result: ApolloQueryResult<T>) {
  const { data, errors, error, loading } = result;

  if (loading) {
    console.log('Loading data...');
    return { data: null, errors: null, error: null, loading };
  }

  if (errors && errors.length > 0) {
    console.error('GraphQL Errors:', errors);
    // Handle GraphQL errors
    return { data: null, errors: errors[0], error: null, loading: false };
  }

  if (error) {
    console.error('Apollo Error:', error);
    // Handle network or other Apollo errors
    return { data: null, errors: null, error: error, loading: false };
  }

  if (data) {
    console.log('Query successful:', data);
    // Handle the successful query result
    return { data, errors: null, error: error, loading: false };
  }
}

export async function getCountryDetailsByCountryCode({ query }: CountriesFilterQueryVariables) {
  const result = await apolloClient.query<CountriesFilterQuery>({
    query: countryCodeFilterQuery,
    variables: {
      query // or "United States"
    }
  });
  assertIsTrue(!!result);

  console.log('🚀 ~ getCountryDetailsByCountryCode ~ result:', result);
  return handleQueryResult(result);
}
