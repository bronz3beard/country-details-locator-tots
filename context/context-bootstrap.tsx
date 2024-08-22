'use client';
import { Children, ReactElement, ReactNode, cloneElement } from 'react';
import { MapProvider } from './map-provider';

const ContextBootstrap = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  return (
    <MapProvider>
      {Children.count(children) > 0
        ? Children.map(children, (child, index) =>
            cloneElement(child as unknown as ReactElement, { index })
          )
        : children}
    </MapProvider>
  );
};

export default ContextBootstrap;
