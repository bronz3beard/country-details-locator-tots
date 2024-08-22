'use client';
import { Children, ReactElement, ReactNode, cloneElement } from 'react';
import { DrawerProvider } from './drawer-context';
import { MapProvider } from './map-provider';

const ContextBootstrap = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  return (
    <DrawerProvider>
      <MapProvider>
        {Children.count(children) > 0
          ? Children.map(children, (child, index) =>
              cloneElement(child as unknown as ReactElement, { index })
            )
          : children}
      </MapProvider>
    </DrawerProvider>
  );
};

export default ContextBootstrap;
