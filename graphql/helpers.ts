import { Connection } from './types';

export const removeEdgesAndNodes = (array: Connection<unknown>) => {
  return array.edges.map((edge) => edge?.node);
};
