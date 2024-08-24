/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';

export type RenderPropComponentArgs<T> = {
  Component: ComponentType<any>;
  renderProp: T;
  testId?: string;
};
/**
 *
 * @paramType {object} args
 * @property {ComponentType<any>} Component this can be either a function or class component
 * @property {T} renderProp this is the render props you are passing to the child component the Type is inferred by what is passed to this generic function.
 * @property {string} testId this is an optional test string you expect to find on any of the child components
 * @returns HTMLElement
 * @usage
 * const result = renderPropComponent<ComponentPropType>({
 *   Component: MyCoolComponent,
 *   renderProp: componentProp,
 *   testId: 'test-id',
 * });
 */
const renderPropComponent = <T,>({ Component, renderProp, testId }: RenderPropComponentArgs<T>) => {
  render(<Component {...renderProp} />);
  return screen.getByTestId(testId ?? '');
};

export default renderPropComponent;
