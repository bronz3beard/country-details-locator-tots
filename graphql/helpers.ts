import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { GraphQLFormattedError } from 'graphql';

export interface QueryRequestResult<T> {
  data: T | null;
  errors: GraphQLFormattedError | null;
  error: ApolloError | null;
  loading: boolean;
}

export function handleQueryResult<T>(result: ApolloQueryResult<T>): QueryRequestResult<T> {
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
    return { data, errors: null, error: null, loading: false };
  }

  return { data: null, errors: null, error: null, loading: false };
}
