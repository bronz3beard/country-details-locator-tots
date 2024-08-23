import { ReactNode } from 'react';

type ConditionalWrapperProps<T> = {
  conditional: T | null | undefined;
  children: ({ value }: { value: T }) => ReactNode;
};

const ConditionalWrapper = <T,>({ conditional, children }: ConditionalWrapperProps<T>) => {
  return !conditional ? null : children({ value: conditional });
};

export default ConditionalWrapper;
