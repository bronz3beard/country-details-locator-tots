/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';

/**
 *
 * @param componentName string
 * @param props unknown
 * @usage
 * mockComponent('ComponentName');
 *
 * const Component = mockComponent<ComponentPropType>(
 *    'ComponentName',
 *    mockProps
 * );
 */
const mockComponent = <T,>(componentName: any, props?: T) => {
  const Component = componentName;

  type MockComponentProps = {
    children?: ReactNode;
  };
  const MockComponent = ({ children }: MockComponentProps) => {
    return <Component {...props}>{!children ? null : children}</Component>;
  };
  // Set the display name for the mock component
  MockComponent.displayName = `Mock(${componentName || 'Unknown'})`;

  return MockComponent;
};

export default mockComponent;
