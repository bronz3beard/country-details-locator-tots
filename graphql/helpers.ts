import { ApolloQueryResult } from '@apollo/client';

export function handleQueryResult<T>(result: ApolloQueryResult<T>) {
  const { data, errors, error, loading } = result;

  if (loading) {
    console.info('Loading data...');
    return { data: null, errors: null, error: null, loading };
  }

  if (errors && errors.length > 0) {
    console.error('GraphQL Errors:', errors);
    return { data: null, errors: errors[0], error: null, loading: false };
  }

  if (error) {
    console.error('Apollo Error:', error);
    return { data: null, errors: null, error: error, loading: false };
  }

  if (data) {
    console.debug('Query successful:');
    return { data, errors: null, error: error, loading: false };
  }

  return { data: null, errors: null, error: null, loading: false };
}
