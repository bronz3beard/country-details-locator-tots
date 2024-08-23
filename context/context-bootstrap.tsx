'use client';
import { Children, ReactElement, ReactNode, cloneElement } from 'react';
import { DrawerProvider } from './drawer-context';

const ContextBootstrap = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  return (
    <DrawerProvider>
      {Children.count(children) > 0
        ? Children.map(children, (child, index) =>
            cloneElement(child as unknown as ReactElement, { index })
          )
        : children}
    </DrawerProvider>
  );
};

export default ContextBootstrap;
