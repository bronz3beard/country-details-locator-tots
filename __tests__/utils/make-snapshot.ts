import type { ReactElement } from 'react';
import ReactTestRenderer from 'react-test-renderer';

export function makeSnapshot(node: ReactElement) {
  return ReactTestRenderer.create(node).toJSON();
}

export default makeSnapshot;
