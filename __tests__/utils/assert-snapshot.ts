import type { ReactElement } from 'react';
import makeSnapshot from './make-snapshot';

export function assertSnapshot(node: ReactElement) {
  return expect(makeSnapshot(node)).toMatchSnapshot();
}
