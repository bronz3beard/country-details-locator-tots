import { render } from '@testing-library/react';
import {
  isValidElement,
  type ComponentType,
  type JSXElementConstructor,
  type ReactElement
} from 'react';

export type RenderPropComponentArgs<T> = {
  Component: ComponentType<any> | ReactElement<any, JSXElementConstructor<any>>;
  props: T;
  testId: string;
};
/**
 *
 * @paramType {object} args
 * @property {ComponentType<any>} Component this can be either a function or class component
 * @property {T} props this is the render props you are passing to the child component the Type is inferred by what is passed to this generic function.
 * @property {string} testId this is an optional test string you expect to find on any of the child components
 * @returns HTMLElement
 * @usage
 * const result = renderPropComponent<ComponentPropType>({
 *   Component: MyCoolComponent,
 *   props: componentProp,
 *   testId: 'test-id',
 * });
 */
const renderPropComponent = <T,>({ Component, props, testId }: RenderPropComponentArgs<T>) => {
  let element = null;
  if (isValidElement(Component)) {
    // If Component is a ReactElement, render it directly
    const { getByTestId } = render(Component);
    element = getByTestId(testId);
  } else {
    // If Component is a ComponentType, render it with props
    const { getByTestId } = render(<Component {...props} />);
    element = getByTestId(testId);
  }

  return element; // screen.getByTestId(testId ?? '');
};

export default renderPropComponent;
// const { getByTestId } = render(
//   <DetailsCard
//     flag="flag"
//     name="name"
//     states={[]}
//     capital="capital"
//     currency="currency"
//     languages={[]}
//     continent="continent"
//     subdivisions={[]}
//   />
// );

// const element = getByTestId('test-details-card');
