import type { ReactElement } from 'react';

export function assertSnapshot(node: ReactElement | HTMLElement) {
  return expect(node).toMatchSnapshot();
}
