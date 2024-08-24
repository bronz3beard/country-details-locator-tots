import { ApolloError, ApolloQueryResult } from '@apollo/client';

export interface QueryRequestResult<T> {
  data: T | null;
  errors: Array<unknown> | null;
  error: ApolloError | null;
  loading: boolean;
}

export function handleQueryResult<T>(
  result: ApolloQueryResult<T>,
  queryName: string
): QueryRequestResult<T> {
  const { data, errors, error, loading } = result;

  if (loading) {
    console.info(queryName, 'Loading data...');
    return { data: null, errors: null, error: null, loading };
  }

  if (errors && errors.length > 0) {
    console.error(queryName, 'GraphQL Errors:', errors);
    return { data: null, errors: errors[0], error: null, loading: false };
  }

  if (error) {
    console.error(queryName, 'Apollo Error:', error);
    return { data: null, errors: null, error: error, loading: false };
  }

  if (data) {
    console.debug(queryName, 'Query successful:');
    return { data, errors: null, error: null, loading: false };
  }

  return { data: null, errors: null, error: null, loading: false };
}
